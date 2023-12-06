package br.com.recyclehub.controller;

import br.com.recyclehub.dao.EmpresaDao;
import br.com.recyclehub.model.Empresa;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/empresa")
@CrossOrigin(origins = "http://localhost:4200")
public class EmpresaController {

    private final EmpresaDao empresaDao;

    public EmpresaController(EmpresaDao empresaDao) {
        this.empresaDao = empresaDao;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String senha = credentials.get("senha");

        Optional<Empresa> empresa = empresaDao.findByEmailAndSenha(email, senha);

        if (empresa.isPresent()) {

            Empresa empresaAutenticada = empresa.get();

            if (!empresaAutenticada.getStatus().equalsIgnoreCase("Aprovada")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Login não permitido, empresa não aprovada\"}");
            }

            if (email.equals("adm") && senha.equals("123")) {
                // adm
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Autenticação bem-sucedida");
                response.put("dadosEmpresa", empresaAutenticada);
                response.put("adm", true);
                
                return ResponseEntity.ok().body(response);
            } else {
                // empresa
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Autenticação bem-sucedida");
                response.put("dadosEmpresa", empresaAutenticada);
                response.put("adm", false);
                
                return ResponseEntity.ok().body(response);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Credenciais inválidas\"}");
        }
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarEmpresa(@RequestBody Empresa novaEmpresa) {
        try {
            Optional<Empresa> empresaExistente = empresaDao.findByCnpj(novaEmpresa.getCnpj());

            if (empresaExistente.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Empresa já cadastrada");
            } else {
                System.out.println("Objeto Empresa recebido no cadastro: " + novaEmpresa.toString());
                if (novaEmpresa.getStatus() == null) {
                    if (novaEmpresa.getEmail().equals("adm") && novaEmpresa.getSenha().equals("123")) {
                        novaEmpresa.setStatus("Aprovada");
                    } else {
                        novaEmpresa.setStatus("Não aprovada");
                    }
                }
                empresaDao.save(novaEmpresa);
                return ResponseEntity.status(HttpStatus.CREATED).body("Empresa cadastrada com sucesso");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar a empresa");
        }
    }

    @GetMapping("/listar")
        public ResponseEntity<List<Empresa>> listarTodasEmpresas() {
            try {
                List<Empresa> empresas = empresaDao.findAll();
                    return ResponseEntity.ok(empresas);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/listar/aprovadas")
    public ResponseEntity<List<Empresa>> listarEmpresasAprovadas() {
        try {
            List<Empresa> empresasAprovadas = empresaDao.findByStatus("Aprovada");
            return ResponseEntity.ok(empresasAprovadas);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/listar/nao-aprovadas")
    public ResponseEntity<List<Empresa>> listarEmpresasNaoAprovadas() {
        try {
            List<Empresa> empresasNaoAprovadas = empresaDao.findByStatusNot("Aprovada");
            return ResponseEntity.ok(empresasNaoAprovadas);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/contarEmpresas")
    public ResponseEntity<Integer> contarEmpresas() {
        try {
            int totalEmpresas = empresaDao.contarEmpresas();

            return ResponseEntity.ok(totalEmpresas);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/editar/{cnpj}")
    public ResponseEntity<String> editarEmpresa(@PathVariable Long cnpj, @RequestBody Empresa empresaAtualizada) {
        try {
            Optional<Empresa> empresaOptional = empresaDao.findByCnpj(cnpj);

            if (empresaOptional.isPresent()) {
                Empresa empresaExistente = empresaOptional.get();

                empresaExistente.setNome(empresaAtualizada.getNome());
                empresaExistente.setEmail(empresaAtualizada.getEmail());
                empresaExistente.setSenha(empresaAtualizada.getSenha());
                empresaExistente.setCep(empresaAtualizada.getCep());
                empresaExistente.setTelefone(empresaAtualizada.getTelefone());
                empresaExistente.setCelular(empresaAtualizada.getCelular());
                empresaExistente.setDescricao(empresaAtualizada.getDescricao());
                empresaExistente.setImg(empresaAtualizada.getImg());

                empresaDao.save(empresaExistente);
                return ResponseEntity.ok("Empresa atualizada com sucesso");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar a empresa");
        }
    }
}
