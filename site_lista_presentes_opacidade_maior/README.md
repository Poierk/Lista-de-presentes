# Versão com opacidade maior

- imagens dos presentes com opacidade aumentada para 94%;
- imagem da vaquinha com opacidade total;
- nenhuma imagem nova foi gerada;
- todo o restante do site foi mantido.

# Versão com opacidade e QR Pix correto

- imagens dos presentes com opacidade suave;
- margens e molduras removidas das fotos;
- vaquinha sem moldura externa;
- QR Code substituído pelo QR enviado pelo usuário;
- chave Pix atualizada para 416.969.068-06;
- titular atualizado para Kálisson Guilherme de Abreu Poier — Inter;
- botão de copiar Pix atualizado.

# Versão com explicação na janela e opção de desfazer

Alterações:
- a explicação sobre presente físico foi removida da página principal;
- a mensagem agora aparece somente ao clicar em **Reservar**;
- no modo de teste local, um item reservado mostra **Reservado — desfazer**;
- ao clicar, é possível tornar o presente disponível novamente;
- em uma versão conectada ao Firebase, a liberação deve ser feita pelo banco ou por uma futura área administrativa.

# Versão com instruções dos presentes físicos

Foi incluído abaixo de “Sugestões de presentes” um aviso explicando que:
- a reserva é apenas para o presente físico;
- não existe pagamento pelo site;
- a função serve para evitar presentes repetidos;
- o item pode ser entregue no dia da celebração ou da forma que o convidado preferir.

# Ajustes finais

- vaquinha levemente menor;
- todos os textos alinhados e padronizados;
- nomes Larissa & Kalisson maiores que todos os demais títulos;
- nomes dos presentes com o mesmo tamanho e altura;
- botões alinhados;
- largura geral equilibrada;
- reservas e Pix mantidos.

# Versão com largura equilibrada e vaquinha única

- apenas uma imagem na vaquinha;
- largura do site reduzida para não ocupar a tela inteira;
- layout ainda confortável, sem ficar estreito;
- presentes menores e melhor espaçados;
- botão “Contribua com Pix” mantido;
- reservas e Pix continuam funcionando.

# Versão compacta com Pix destacado

- imagens dos presentes reduzidas;
- mais espaço entre os cards;
- vaquinha sem moldura externa;
- botão alterado para “Contribua com Pix”;
- funções de reserva e Pix mantidas.

# Versão sem molduras

As imagens foram recortadas para remover as bordas incorporadas, e as molduras externas foram retiradas. Os presentes e a vaquinha agora ficam alinhados diretamente no grid, sem imagens escapando ou molduras duplicadas.

# Site novo da lista de presentes

Esta versão foi recriada do zero em HTML/CSS.

## Como abrir
1. Extraia o ZIP.
2. Abra `index.html`.

## Reservas compartilhadas
Sem Firebase, as reservas ficam salvas apenas no navegador usado.

Para compartilhar entre todos:
1. Crie um projeto no Firebase.
2. Ative o Realtime Database.
3. Cole a URL do banco em `config.js`.
