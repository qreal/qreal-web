package com.example.osmmaps;

import java.util.ArrayList;

import org.osmdroid.ResourceProxy;
import org.osmdroid.api.IMapView;
import org.osmdroid.util.GeoPoint;
import org.osmdroid.views.overlay.ItemizedOverlay;
import org.osmdroid.views.overlay.OverlayItem;

import android.app.AlertDialog;
import android.content.Context;
import android.graphics.Point;
import android.graphics.drawable.Drawable;

public class MyItemizedOverlay extends ItemizedOverlay<OverlayItem> {

	private ArrayList<OverlayItem> overlayItemList = new ArrayList<OverlayItem>();

	public MyItemizedOverlay(Drawable pDefaultMarker,
			ResourceProxy pResourceProxy, Context context) {
		super(pDefaultMarker, pResourceProxy);
		mContext = context;
		// TODO Auto-generated constructor stub
	}

	public void addItem(GeoPoint p, String title, String snippet) {
		OverlayItem newItem = new OverlayItem(title, snippet, p);
		overlayItemList.add(newItem);
		populate();
	}

	@Override
	public boolean onSnapToItem(int arg0, int arg1, Point arg2, IMapView arg3) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	protected boolean onTap(int index) {
		OverlayItem item = overlayItemList.get(index);
		AlertDialog.Builder dialog = new AlertDialog.Builder(mContext);
		dialog.setTitle(item.getTitle());
		dialog.setMessage(item.getSnippet());
		dialog.show();
		return true;
	}

	@Override
	protected OverlayItem createItem(int arg0) {
		// TODO Auto-generated method stub
		return overlayItemList.get(arg0);
	}

	@Override
	public int size() {
		// TODO Auto-generated method stub
		return overlayItemList.size();
	}

	private Context mContext;
}
