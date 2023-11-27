package br.com.recyclehub.controller;

import br.com.recyclehub.dao.EmpresaDao;
import br.com.recyclehub.model.Empresa;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/empresa")
@CrossOrigin(origins = "*")
public class EmpresaController {

    private final EmpresaDao empresaDao;

    public EmpresaController(EmpresaDao empresaDao) {
        this.empresaDao = empresaDao;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String senha = credentials.get("senha");

        // Consulta no banco de dados para verificar se o usuário existe
        Optional<Empresa> empresa = empresaDao.findByEmailAndSenha(email, senha);

        if (empresa.isPresent()) {
            // Obtém os dados da empresa
            Empresa empresaAutenticada = empresa.get();

            // Crie um objeto Map para incluir a mensagem e os dados da empresa na resposta
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Autenticação bem-sucedida");
            response.put("dadosEmpresa", empresaAutenticada); // Inclua os dados da empresa

            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Credenciais inválidas\"}");
        }
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarEmpresa(@RequestBody Empresa novaEmpresa) {
        try {
            // Verifica se a empresa já existe no banco de dados pelo CNPJ
            Optional<Empresa> empresaExistente = empresaDao.findByCnpj(novaEmpresa.getCnpj());

            if (empresaExistente.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Empresa já cadastrada");
            } else {
                // Salvando a nova empresa
                empresaDao.save(novaEmpresa);
                return ResponseEntity.status(HttpStatus.CREATED).body("Empresa cadastrada com sucesso");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar a empresa");
        }
    }
}
