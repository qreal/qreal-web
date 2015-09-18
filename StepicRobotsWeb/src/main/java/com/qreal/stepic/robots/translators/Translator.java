package com.qreal.stepic.robots.translators;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by vladimir-zakharov on 18.09.15.
 */
public abstract class Translator {

    private Map<String, String> translationMap = new HashMap<>();

    public boolean isPredefindesValue(String value) {
        return translationMap.containsKey(value);
    }

    public String translate(String str) {
        return translationMap.get(str);
    }

    public void appendTranslationStrings(Map<String, String> translations) {
        this.translationMap.putAll(translations);
    }

}
