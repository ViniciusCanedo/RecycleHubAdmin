package br.com.recyclehub.controller;

import br.com.recyclehub.dao.EmpresaDao;
import br.com.recyclehub.dao.ProdutoDao;
import br.com.recyclehub.model.Empresa;
import br.com.recyclehub.model.Produto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Map;

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

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarProduto(@PathVariable Long id) {
        try {
            Optional<Produto> produtoOptional = produtoDao.findById(id);
            if (produtoOptional.isPresent()) {
                produtoDao.delete(produtoOptional.get());
                return ResponseEntity.ok("Produto deletado com sucesso");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao deletar o produto");
        }
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editarProduto(@PathVariable Long id, @RequestBody Produto produtoAtualizado) {
        try {
            Optional<Produto> produtoOptional = produtoDao.findById(id);
            if (produtoOptional.isPresent()) {
                Produto produtoExistente = produtoOptional.get();

                produtoExistente.setNome(produtoAtualizado.getNome());
                produtoExistente.setPreco(produtoAtualizado.getPreco());
                produtoExistente.setUnidadeMedida(produtoAtualizado.getUnidadeMedida());
                produtoExistente.setDescricao(produtoAtualizado.getDescricao());
                produtoExistente.setStatus(produtoAtualizado.getStatus());
                produtoExistente.setImagem(produtoAtualizado.getImagem());

                produtoDao.save(produtoExistente);
                return ResponseEntity.ok("{\"message\": \"Produto deletado com sucesso\"}");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar o produto");
        }
    }

    @PutMapping("/publicar/{id}")
    public ResponseEntity<String> atualizarStatusProduto(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
        try {
            Optional<Produto> produtoOptional = produtoDao.findById(id);
            if (produtoOptional.isPresent()) {
                Produto produtoExistente = produtoOptional.get();

                String novoStatus = requestBody.get("novoStatus");

                produtoExistente.setStatus(novoStatus);
                produtoDao.save(produtoExistente);
            
                produtoDao.save(produtoExistente);
                return ResponseEntity.ok("{\"message\": \"Status do produto atualizado com sucesso\"}");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar o status do produto");
        }
    }

    @GetMapping("/somaVisualizacoes/{cnpj}")
    public ResponseEntity<Integer> calcularSomaVisualizacoes(@PathVariable Long cnpj) {
        try {
            ResponseEntity<List<Produto>> response = this.listarProdutosPorEmpresa(cnpj);
            
            if (response.getStatusCode() == HttpStatus.OK) {
                List<Produto> produtos = response.getBody();

                int somaVisualizacoes = 0;
                for (Produto produto : produtos) {
                    somaVisualizacoes += produto.getVisualizacoes();
                }
                
                return ResponseEntity.ok(somaVisualizacoes);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}


