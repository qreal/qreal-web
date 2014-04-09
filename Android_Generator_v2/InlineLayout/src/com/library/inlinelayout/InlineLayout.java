package com.library.inlinelayout;

import android.content.Context;
import android.graphics.Rect;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RemoteViews;

@RemoteViews.RemoteView
public class InlineLayout extends ViewGroup {
    /** The amount of space used by children in the left gutter. */
    private int mLeftWidth;
    private static final String TAG = "InlineLayout";

    /** These are used for computing child frames based on their gravity. */
    private final Rect mTmpContainerRect = new Rect();
    private final Rect mTmpChildRect = new Rect();

    public InlineLayout(Context context) {
        super(context);
    }

    public InlineLayout(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public InlineLayout(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    /**
     * Any layout manager that doesn't scroll will want this.
     */
    @Override
    public boolean shouldDelayChildPressedState() {
        return false;
    }

    /**
     * Ask all children to measure themselves and compute the measurement of this
     * layout based on the children.
     */
    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    	Log.d(TAG, "onMesasure");
    	int parentWidth = MeasureSpec.getSize(widthMeasureSpec);
	
    	int count = getChildCount();

        // These keep track of the space we are using on the left for
        // views positioned there; we need member variable so we can also use
        // these for layout later.
        mLeftWidth = 0;

        int maxHeight = 0;
        int maxWidth = 0;
        int maxWidthLine = 0;
        int maxLineHeight = 0;
        int heightLastLine = 0;

        // Iterate through all children, measuring them and computing our dimensions
        // from their size.
        for (int i = 0; i < count; i++) {
            final View child = getChildAt(i);
            if (child.getVisibility() != GONE) {
                // Measure the child.
                measureChildWithMargins(child, widthMeasureSpec, 0, heightMeasureSpec, 0);

                final LayoutParams lp = (LayoutParams) child.getLayoutParams();
                int height = child.getMeasuredHeight() + lp.topMargin + lp.bottomMargin;
                int width = child.getMeasuredWidth() + lp.leftMargin + lp.rightMargin;
                maxLineHeight = Math.max(maxLineHeight, height);

                int tempWidth = mLeftWidth + width;
                if (tempWidth > parentWidth) {
                	maxWidthLine = Math.max(mLeftWidth, maxWidthLine);
                	heightLastLine = heightLastLine + maxLineHeight;
                	maxHeight = heightLastLine + height;
                	mLeftWidth = width;
                	maxLineHeight = height;
                } else {
                	mLeftWidth = tempWidth;
                	maxHeight = Math.max(maxHeight, heightLastLine + height);
                }   
            }
        }

        // Check against our minimum height and width
        maxHeight = Math.max(maxHeight, getSuggestedMinimumHeight());
        maxWidth = Math.max(maxWidthLine, getSuggestedMinimumWidth());

        // Report our final dimensions.
        setMeasuredDimension(resolveSize(maxWidth, widthMeasureSpec),
                resolveSize(maxHeight, heightMeasureSpec));
    }

    /**
     * Position all children within this layout.
     */
    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
    	Log.d(TAG, "onLayout");
    	final int count = getChildCount();
        
        int leftPos = getPaddingLeft();
        int parentTop = getPaddingTop();
        int parentBottom = bottom - top - getPaddingBottom();
        
        int maxLineHeight = 0;

        for (int i = 0; i < count; i++) {
            final View child = getChildAt(i);
            if (child.getVisibility() != GONE) {
                final LayoutParams lp = (LayoutParams) child.getLayoutParams();

                final int width = child.getMeasuredWidth();
                final int height = child.getMeasuredHeight();
                
                maxLineHeight = Math.max(maxLineHeight, height);

                if (leftPos + width + lp.rightMargin > right) {
                	parentBottom += maxLineHeight;
                	parentTop += maxLineHeight;
                	leftPos = getPaddingLeft();
                	maxLineHeight = height;
                } 
                mTmpContainerRect.left = leftPos + lp.leftMargin;
                mTmpContainerRect.right = leftPos + width + lp.rightMargin;
                leftPos = mTmpContainerRect.right;
                
                mTmpContainerRect.top = parentTop + lp.topMargin;
                mTmpContainerRect.bottom = parentBottom - lp.bottomMargin;

                // Use the child's gravity and size to determine its final
                // frame within its container.
                Gravity.apply(lp.gravity, width, height, mTmpContainerRect, mTmpChildRect);

                // Place the child.
                child.layout(mTmpChildRect.left, mTmpChildRect.top,
                        mTmpChildRect.right, mTmpChildRect.bottom);
            }
        }
    }

    // ----------------------------------------------------------------------
    // The rest of the implementation is for custom per-child layout parameters.
    // If you do not need these (for example you are writing a layout manager
    // that does fixed positioning of its children), you can drop all of this.

    @Override
    public LayoutParams generateLayoutParams(AttributeSet attrs) {
        return new InlineLayout.LayoutParams(getContext(), attrs);
    }

    @Override
    protected LayoutParams generateDefaultLayoutParams() {
        return new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
    }

    @Override
    protected ViewGroup.LayoutParams generateLayoutParams(ViewGroup.LayoutParams p) {
        return new LayoutParams(p);
    }

    @Override
    protected boolean checkLayoutParams(ViewGroup.LayoutParams p) {
        return p instanceof LayoutParams;
    }

    /**
     * Custom per-child layout information.
     */
    public static class LayoutParams extends MarginLayoutParams {
        /**
         * The gravity to apply with the View to which these layout parameters
         * are associated.
         */
        public int gravity = Gravity.TOP | Gravity.LEFT;

        public LayoutParams(Context c, AttributeSet attrs) {
            super(c, attrs);
        }

        public LayoutParams(int width, int height) {
            super(width, height);
        }

        public LayoutParams(ViewGroup.LayoutParams source) {
            super(source);
        }
    }
}
