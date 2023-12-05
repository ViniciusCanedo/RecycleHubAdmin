package br.com.recyclehub.dao;

import br.com.recyclehub.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaDao extends JpaRepository<Categoria, Long> {
    Optional<Categoria> findByNome(String nome);
    Optional<Categoria> findById(long id);
    List<Categoria> findAll();
}
