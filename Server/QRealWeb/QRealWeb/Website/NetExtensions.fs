// From http://fssnip.net/6d
module NetExtensions

open System
open System.IO
open System.Net
open System.Threading
open System.Collections.Generic

// [snippet:System.Net Extensions]
type System.Net.HttpListener with
  /// Asynchronously retrieves the next incoming request
  member x.AsyncGetContext() = 
    Async.FromBeginEnd(x.BeginGetContext, x.EndGetContext)

type System.Net.WebClient with
  /// Asynchronously downloads data from the 
  member x.AsyncDownloadData(uri) = 
    Async.FromContinuations(fun (cont, econt, ccont) ->
      x.DownloadDataCompleted.Add(fun res ->
        if res.Error <> null then econt res.Error
        elif res.Cancelled then ccont (new OperationCanceledException())
        else cont res.Result)
      x.DownloadDataAsync(uri) )

type System.Net.HttpListener with 
  /// Starts an HTTP server on the specified URL with the
  /// specified asynchronous function for handling requests
  static member Start(url, f) = 
    let tokenSource = new CancellationTokenSource()
    Async.Start
      ( ( async { 
            use listener = new HttpListener()
            listener.Prefixes.Add(url)
            listener.Start()
            while true do 
              let! context = listener.AsyncGetContext()
              Async.Start(f context, tokenSource.Token) }),
        cancellationToken = tokenSource.Token)
    tokenSource

  /// Starts an HTTP server on the specified URL with the
  /// specified synchronous function for handling requests
  static member StartSynchronous(url, f) =
    HttpListener.Start(url, f >> async.Return) 
// [/snippet]
