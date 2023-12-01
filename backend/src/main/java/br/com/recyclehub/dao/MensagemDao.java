package br.com.recyclehub.dao;

import br.com.recyclehub.model.Empresa;
import br.com.recyclehub.model.Mensagem;
import br.com.recyclehub.model.Produto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MensagemDao extends JpaRepository<Mensagem, Long> {
    List<Mensagem> findByProduto(Produto produto);
}
