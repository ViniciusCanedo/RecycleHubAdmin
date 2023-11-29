package br.com.recyclehub.controller;

import br.com.recyclehub.dao.EmpresaDao;
import br.com.recyclehub.dao.ProdutoDao;
import br.com.recyclehub.model.Empresa;
import br.com.recyclehub.model.Produto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "http://localhost:4200")
public class ProdutoController {

    private final ProdutoDao produtoDao;
    private final EmpresaDao empresaDao;

    public ProdutoController(ProdutoDao produtoDao, EmpresaDao empresaDao) {
        this.produtoDao = produtoDao;
        this.empresaDao = empresaDao;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarProduto(@RequestBody Produto novoProduto) {
        try {
            System.out.println("Objeto Empresa recebido no cadastro: " + novoProduto.toString());
            produtoDao.save(novoProduto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Produto cadastrado com sucesso");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar o produto");
        }
    }
    
    @GetMapping("/listarPorEmpresa/{cnpj}")
    public ResponseEntity<List<Produto>> listarProdutosPorEmpresa(@PathVariable Long cnpj) {
        try {
            Optional<Empresa> empresaOptional = empresaDao.findByCnpj(cnpj);
            if (empresaOptional.isPresent()) {
                List<Produto> produtos = produtoDao.findByEmpresa(empresaOptional.get());
                return ResponseEntity.ok(produtos);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

