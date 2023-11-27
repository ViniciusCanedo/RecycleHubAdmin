package br.com.recyclehub.controller;

import br.com.recyclehub.dao.MensagemDao;
import br.com.recyclehub.model.Empresa;
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
}

