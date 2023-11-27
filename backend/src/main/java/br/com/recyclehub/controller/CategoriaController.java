package br.com.recyclehub.controller;

import br.com.recyclehub.dao.CategoriaDao;
import br.com.recyclehub.model.Categoria;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/categoria")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriaController {

    private final CategoriaDao categoriaDao;

    public CategoriaController(CategoriaDao categoriaDao) {
        this.categoriaDao = categoriaDao;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarCategoria(@RequestBody Categoria novaCategoria) {
        try {
            Optional<Categoria> categoriaExistente = categoriaDao.findByNome(novaCategoria.getNome());

            if (categoriaExistente.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Categoria já cadastrada");
            } else {
                // Salvando a nova categoria
                categoriaDao.save(novaCategoria);
                return ResponseEntity.status(HttpStatus.CREATED).body("Categoria cadastrada com sucesso");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar a categoria");
        }
    }
}
