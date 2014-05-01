package com.example.osmmaps;

import org.osmdroid.DefaultResourceProxyImpl;
import org.osmdroid.ResourceProxy;
import org.osmdroid.tileprovider.tilesource.TileSourceFactory;
import org.osmdroid.util.GeoPoint;
import org.osmdroid.views.MapController;
import org.osmdroid.views.MapView;
import org.osmdroid.views.overlay.mylocation.MyLocationNewOverlay;

import android.app.Activity;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends Activity {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		MapView mapView = (MapView) findViewById(R.id.mapview);
		mapView.setBuiltInZoomControls(true);
		mapView.setTileSource(TileSourceFactory.MAPQUESTOSM);
		mapView.setBuiltInZoomControls(true);
		mapView.setMultiTouchControls(true);
		mapView.setClickable(true);
		mapView.setUseDataConnection(true);
		mapController = (MapController) mapView.getController();
		mapController.setZoom(10);
		mapController
				.setCenter(new GeoPoint(defaultLatitude, defaultLongitude));

		Drawable marker = getResources().getDrawable(R.drawable.blue_pin);
		int markerWidth = marker.getIntrinsicWidth();
		int markerHeight = marker.getIntrinsicHeight();
		marker.setBounds(0, markerHeight, markerWidth, 0);

		ResourceProxy resourceProxy = new DefaultResourceProxyImpl(
				getApplicationContext());

		myItemizedOverlay = new MyItemizedOverlay(marker, resourceProxy, this);
		mapView.getOverlays().add(myItemizedOverlay);

		setPushpin(defaultLatitude, defaultLongitude, "myPoint1", "myPoint1");

		myLocationOverlay = new MyLocationNewOverlay(this, mapView);
		myLocationOverlay.runOnFirstFix(new Runnable() {
			public void run() {
				mapController.animateTo(myLocationOverlay.getMyLocation());
			}
		});
		mapView.getOverlays().add(myLocationOverlay);
		myLocationOverlay.enableMyLocation();
	}

	public void getLocationButtonClick(View v) {
		getMyLocation();
	}

	public void getMyLocation() {
		GeoPoint myPoint = myLocationOverlay.getMyLocation();
		if (myPoint != null) {
			mapController.animateTo(myLocationOverlay.getMyLocation());
		}
	}

	public void setPushpin(double latitude, double longtitude, String title,
			String snippet) {
		GeoPoint point = new GeoPoint(latitude, longtitude);
		myItemizedOverlay.addItem(point, title, snippet);
	}

	public void setPushpin(GeoPoint point, String title, String snippet) {
		myItemizedOverlay.addItem(point, title, snippet);
	}

	private MyItemizedOverlay myItemizedOverlay;
	private MyLocationNewOverlay myLocationOverlay;
	private MapController mapController;
	private static final double defaultLatitude = 59.95;
	private static final double defaultLongitude = 30.316667;
}
