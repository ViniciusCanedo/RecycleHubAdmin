package br.com.recyclehub.dao;

import br.com.recyclehub.model.Empresa;
import br.com.recyclehub.model.Endereco;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnderecoDao extends JpaRepository<Endereco, Long> {
    Optional<Endereco> findById(long id);
    List<Endereco> findByEmpresa(Empresa empresa);
}
