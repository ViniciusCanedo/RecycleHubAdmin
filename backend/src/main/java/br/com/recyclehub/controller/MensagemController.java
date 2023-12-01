package br.com.recyclehub.controller;

import br.com.recyclehub.dao.MensagemDao;
import br.com.recyclehub.dao.ProdutoDao;
import br.com.recyclehub.model.Empresa;
import br.com.recyclehub.model.Mensagem;
import br.com.recyclehub.model.Produto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/mensagem")
@CrossOrigin(origins = "http://localhost:4200")
public class MensagemController {

    private final MensagemDao mensagemDao;
    private final ProdutoDao produtoDao;


    public MensagemController(MensagemDao mensagemDao, ProdutoDao produtoDao) {
        this.mensagemDao = mensagemDao;
        this.produtoDao = produtoDao;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarMensagem(@RequestBody Mensagem novaMensagem) {
        try {
            // Salvando a nova mensagem
            mensagemDao.save(novaMensagem);
            return ResponseEntity.status(HttpStatus.CREATED).body("Mensagem cadastrada com sucesso");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar a mensagem");
        }
    }

    @GetMapping("/listarPorProduto/{id}")
    public ResponseEntity<List<Mensagem>> listarMensagensPorProduto(@PathVariable Long id) {
        try {
            Optional<Produto> produtoOptional = produtoDao.findById(id);
            if (produtoOptional.isPresent()) {
                List<Mensagem> mensagens = mensagemDao.findByProduto(produtoOptional.get());
                return ResponseEntity.ok(mensagens);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace(); // Adicione esta linha para imprimir o stack trace no console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

