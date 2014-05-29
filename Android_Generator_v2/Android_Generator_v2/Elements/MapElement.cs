using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Android_Generator_v2
{
    class MapElement : Element
    {
        public MapElement()
        {
            imports.Add("import org.osmdroid.util.GeoPoint;");
            imports.Add("import org.osmdroid.views.MapController;");
            imports.Add("import org.osmdroid.views.MapView;");
            imports.Add("import org.osmdroid.views.overlay.mylocation.MyLocationNewOverlay;");
            imports.Add("import org.osmdroid.tileprovider.tilesource.TileSourceFactory;");
        }

        public void setId(String id)
        {
            this.id = id;
            variables.Append(String.Format(@"
	            private MyLocationNewOverlay myLocationOverlay{0};
	            private MapController mapController{0};
	            private static final double defaultLatitude{0} = 59.95;
	            private static final double defaultLongitude{0} = 30.316667;", id));
            setInit();
        }

        public void addXmlAttr(String attr, String value)
        {
            xmlAttrs.Append(String.Format(@"android:{0}=""{1}""
                ", attr, value));
        }

        public void addOnCreateActions(String actions)
        {
            onCreateActions.Append(actions);
        }

        public String getXml()
        {
            return String.Format(xmlTemplate, id, xmlAttrs.ToString());
        }

        public String getOnCreateActions()
        {
            return onCreateActions.ToString();
        }

        public HashSet<String> getImports()
        {
            return imports;
        }

        public String getVariables()
        {
            return variables.ToString();
        }

        public String getGeolocationMethod()
        {
            return String.Format(@"
                public void getLocation{0}() {{
		            GeoPoint myPoint = myLocationOverlay{0}.getMyLocation();
		            if (myPoint != null) {{
			            mapController{0}.animateTo(myLocationOverlay{0}.getMyLocation());
		            }}
	            }}", id);
        }

        private void setInit()
        {
            addOnCreateActions(String.Format(@"
                MapView mapView{0} = (MapView) findViewById(R.id.{0});
		        mapView{0}.setBuiltInZoomControls(true);
		        mapView{0}.setTileSource(TileSourceFactory.MAPQUESTOSM);
		        mapView{0}.setBuiltInZoomControls(true);
		        mapView{0}.setMultiTouchControls(true);
		        mapView{0}.setClickable(true);
		        mapView{0}.setUseDataConnection(true);
		        mapController{0} = (MapController) mapView{0}.getController();
		        mapController{0}.setZoom(10);
		        mapController{0}
				    .setCenter(new GeoPoint(defaultLatitude{0}, defaultLongitude{0}));

		        myLocationOverlay{0} = new MyLocationNewOverlay(this, mapView{0});
		        myLocationOverlay{0}.runOnFirstFix(new Runnable() {{
			        public void run() {{
				        mapController{0}.animateTo(myLocationOverlay{0}.getMyLocation());
			        }}
		        }});
		        mapView{0}.getOverlays().add(myLocationOverlay{0});
		        myLocationOverlay{0}.enableMyLocation();", id));
        }

        private StringBuilder onCreateActions = new StringBuilder();
        private StringBuilder xmlAttrs = new StringBuilder();
        private HashSet<String> imports = new HashSet<String>();
        private StringBuilder variables = new StringBuilder();
        private String id;
        private static String xmlTemplate = @"
            <org.osmdroid.views.MapView
                android:id=""@+id/{0}"" 
                android:layout_width=""match_parent""
                android:layout_height=""350dp""
                android:clickable=""true""
                android:layout_marginBottom=""2dp""
                android:layout_marginTop=""2dp""
                {1}
                >
            </org.osmdroid.views.MapView>";
    }
}
