package br.com.recyclehub.dao;

import br.com.recyclehub.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmpresaDao extends JpaRepository<Empresa, Long> {
    Optional<Empresa> findByEmailAndSenha(String email, String senha);
    Optional<Empresa> findByCnpj(long cnpj);
    List<Empresa> findAll();
    List<Empresa> findByStatus(String status);
    List<Empresa> findByStatusNot(String status);

    @Query("SELECT COUNT(e) FROM Empresa e")
    int contarEmpresas();
}
