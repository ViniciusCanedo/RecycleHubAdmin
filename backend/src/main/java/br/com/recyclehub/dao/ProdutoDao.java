package br.com.recyclehub.dao;

import br.com.recyclehub.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ProdutoDao extends JpaRepository<Produto, Long> {
    Optional<Produto> findByNome(String nome);
}
