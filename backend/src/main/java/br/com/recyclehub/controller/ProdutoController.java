package br.com.recyclehub.controller;

import br.com.recyclehub.dao.ProdutoDao;
import br.com.recyclehub.model.Produto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "http://localhost:4200")
public class ProdutoController {

    private final ProdutoDao produtoDao;

    public ProdutoController(ProdutoDao produtoDao) {
        this.produtoDao = produtoDao;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarProduto(@RequestBody Produto novoProduto) {
        try {
            // Salvando a nova empresa
            produtoDao.save(novoProduto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Produto cadastrado com sucesso");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar o produto");
        }
    }
}

