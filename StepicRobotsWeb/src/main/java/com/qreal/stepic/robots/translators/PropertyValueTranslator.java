package com.qreal.stepic.robots.translators;

import com.qreal.stepic.robots.model.diagram.DiagramNode;
import com.qreal.stepic.robots.model.diagram.Property;

import java.util.Locale;
import java.util.Set;

/**
 * Created by vladimir-zakharov on 18.09.15.
 */
public class PropertyValueTranslator {

    public void translateAllPropertiesValue(Set<DiagramNode> nodes, Locale locale) {
        TranslatorFactory factory = new TranslatorFactory();
        Translator translator = factory.createTranslator(locale);
        for (DiagramNode node : nodes) {
            translatePropertiesValue(node.getLogicalProperties(), translator);
        }
    }

    private void translatePropertiesValue(Set<Property> properties, Translator translator) {
        for (Property property : properties) {
            if (translator.isPredefindesValue(property.getValue())) {
                property.setValue(translator.translate(property.getValue()));
            }
        }
    }

}
