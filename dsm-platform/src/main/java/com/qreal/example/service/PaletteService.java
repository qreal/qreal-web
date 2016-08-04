package com.qreal.example.service;

import com.qreal.example.dao.PaletteDAO;
import com.qreal.example.model.Palette;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by LChernigovskaya on 18.03.2016.
 */
@Service
public class PaletteService {
    @Autowired
    private PaletteDAO paletteDAO;

    @Transactional
    public void createPalette(Palette palette) {
        paletteDAO.createPalette(palette);
    }

    @Transactional
    public Palette getPalette(String namePalette) {
        return paletteDAO.getPalette(namePalette);
    }

    @Transactional
    public List<String> showPaletteNames() {
        return paletteDAO.showPaletteNames();
    }
}
