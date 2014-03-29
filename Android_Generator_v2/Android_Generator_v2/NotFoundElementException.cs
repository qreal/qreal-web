using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Android_Generator_v2
{
    class NotFoundElementException : Exception
    {
        public NotFoundElementException( ) :
            base(notFoundMessage)
        { }

        public NotFoundElementException(String message) :
            base(String.Format("{0} {1}", notFoundMessage, message))
        { }

        const string notFoundMessage = "Not found element";
    }
}
