package br.com.recyclehub.controller;

import br.com.recyclehub.dao.MensagemDao;
import br.com.recyclehub.model.Mensagem;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/mensagem")
@CrossOrigin(origins = "http://localhost:4200")
public class MensagemController {

    private final MensagemDao mensagemDao;

    public MensagemController(MensagemDao mensagemDao) {
        this.mensagemDao = mensagemDao;
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
}

