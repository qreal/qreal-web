using System.Data.Entity;

namespace QReal_MobileDesigner.Models
{
    public class UserProject
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Package { get; set; }
        public string Type { get; set; }
    }

    public class QRealDesignerDBContext : DbContext
    {
        public DbSet<UserProject> UserProject { get; set; }
    }
}