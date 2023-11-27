package br.com.recyclehub.dao;

import br.com.recyclehub.model.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EnderecoDao extends JpaRepository<Endereco, Long> {
}
