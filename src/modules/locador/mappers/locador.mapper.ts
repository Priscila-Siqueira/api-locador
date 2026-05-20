import { endereco_locador, locador } from '@prisma/client';

type LocadorComEndereco = locador & {
  endereco_locador: endereco_locador | null;
};

export class LocadorMapper {
  static paraResposta(locador: LocadorComEndereco) {
    return {
      id: Number(locador.id),
      usuarioId: Number(locador.usuario_id),
      nome: locador.nome,
      cpf: locador.cpf,
      email: locador.email,
      status: locador.status,
      criadoEm: locador.criado_em,
      atualizadoEm: locador.atualizado_em,
      endereco: locador.endereco_locador
        ? {
            locadorId: Number(locador.endereco_locador.locador_id),
            logradouro: locador.endereco_locador.logradouro,
            numero: locador.endereco_locador.numero,
            complemento: locador.endereco_locador.complemento,
            bairro: locador.endereco_locador.bairro,
            cidade: locador.endereco_locador.cidade,
            estado: locador.endereco_locador.estado,
            cep: locador.endereco_locador.cep,
          }
        : null,
    };
  }

  static paraListaResposta(locadores: LocadorComEndereco[]) {
    return locadores.map((locador) => this.paraResposta(locador));
  }
}