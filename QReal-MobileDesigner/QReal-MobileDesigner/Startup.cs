using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(QReal_MobileDesigner.Startup))]
namespace QReal_MobileDesigner
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
