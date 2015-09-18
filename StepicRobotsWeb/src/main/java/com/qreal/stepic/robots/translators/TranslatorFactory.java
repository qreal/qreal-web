package com.qreal.stepic.robots.translators;

import java.util.Locale;

/**
 * Created by vladimir-zakharov on 18.09.15.
 */
public class TranslatorFactory {

    public Translator createTranslator(Locale locale) {
        return new RussianTranslator();
    }

}
