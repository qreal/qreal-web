package com.qreal.stepic.robots.translators;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by vladimir-zakharov on 18.09.15.
 */
public class RussianTranslator extends Translator {

    public RussianTranslator() {
        Map<String, String> translations = new HashMap<>();
        translations.put("истина", "true");
        translations.put("ложь", "false");
        translations.put("тело цикла", "body");
    }

}
