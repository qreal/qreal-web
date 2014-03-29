namespace QReal_MobileDesigner.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DelProject : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.AspNetUsers", "Projects");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "Projects", c => c.Int());
        }
    }
}
