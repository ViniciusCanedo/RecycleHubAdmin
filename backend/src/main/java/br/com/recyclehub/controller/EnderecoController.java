package br.com.recyclehub.controller;

import br.com.recyclehub.dao.EnderecoDao;
import br.com.recyclehub.dao.EmpresaDao;

import br.com.recyclehub.model.Empresa;
import br.com.recyclehub.model.Endereco;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/endereco")
@CrossOrigin(origins = "http://localhost:4200")
public class EnderecoController {

    private final EmpresaDao empresaDao;
    private final EnderecoDao enderecoDao;

    public EnderecoController(EnderecoDao enderecoDao, EmpresaDao empresaDao) {
        this.enderecoDao = enderecoDao;
        this.empresaDao = empresaDao;
    }

    @PostMapping("/{cnpj}/cadastro")
    public ResponseEntity<String> cadastrarEnderecoParaEmpresa(
            @PathVariable Long cnpj,
            @RequestBody Endereco novoEndereco) {

        try {
            Optional<Empresa> empresa = empresaDao.findByCnpj(cnpj);
            System.out.println("endereco");
            if (empresa.isPresent()) {
                System.out.println("Empresa encontrada: " + empresa.get().toString());
                novoEndereco.setEmpresa(empresa.get());
                System.out.println("Endereco antes de salvar: " + novoEndereco.toString());
                enderecoDao.save(novoEndereco);
                return ResponseEntity.status(HttpStatus.CREATED).body("Endereço cadastrado com sucesso");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Empresa não encontrada");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar o endereço");
        }
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editarEndereco(@PathVariable Long id, @RequestBody Endereco enderecoAtualizado) {
        try {
            Optional<Endereco> enderecoOptional = enderecoDao.findById(id);

            if (enderecoOptional.isPresent()) {
                Endereco enderecoExistente = enderecoOptional.get();

                enderecoExistente.setUf(enderecoAtualizado.getUf());
                enderecoExistente.setCidade(enderecoAtualizado.getCidade());
                enderecoExistente.setLogradouro(enderecoAtualizado.getLogradouro());
                enderecoExistente.setNumero(enderecoAtualizado.getNumero());
                enderecoExistente.setComplemento(enderecoAtualizado.getComplemento());

                enderecoDao.save(enderecoExistente);
                return ResponseEntity.ok("Endereço atualizado com sucesso");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar o endereco");
        }
    }

    @GetMapping("/listarPorEmpresa/{cnpj}")
    public ResponseEntity<List<Endereco>> listarEnderecosPorEmpresa(@PathVariable Long cnpj) {
        try {
            Optional<Empresa> empresaOptional = empresaDao.findByCnpj(cnpj);
            if (empresaOptional.isPresent()) {
                List<Endereco> enderecos = enderecoDao.findByEmpresa(empresaOptional.get());
                return ResponseEntity.ok(enderecos);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarEndereco(@PathVariable Long id) {
        try {
            Optional<Endereco> enderecoOptional = enderecoDao.findById(id);
            if (enderecoOptional.isPresent()) {
                enderecoDao.delete(enderecoOptional.get());
                return ResponseEntity.ok("Endereço deletado com sucesso");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao deletar o endereço");
        }
    }
}

