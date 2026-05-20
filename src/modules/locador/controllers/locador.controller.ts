import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarLocadorDto } from '../dto/create-locador.dto';
import { LocadorService } from '../services/locador.service';

@Controller('locadores')
export class LocadorController {
  constructor(private readonly locadorService: LocadorService) {}

  @Post()
  criarLocador(@Body() criarLocadorDto: CriarLocadorDto) {
    //Esse trecho é temporário:
    //Depois, quando integrarmos com o token JWT, isso será substituído 
    // por algo como:usuarioIdCorretorLogado = usuario.id;
    //O importante é que o front não envia usuario_id no body.
    //Mais para frente, quando integrar com Login/JWT, 
    // esse 1 vai sair e será substituído pelo ID do corretor vindo do token.
    const usuarioIdCorretorLogado = 1;

    return this.locadorService.criarLocador(
      criarLocadorDto,
      usuarioIdCorretorLogado,
    );
  }

  @Get()
  listarLocadores() {
    return this.locadorService.listarLocadores();
  }
}