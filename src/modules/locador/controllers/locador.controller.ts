import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CriarLocadorDto } from '../dto/create-locador.dto';
import { LocadorService } from '../services/locador.service';
import { AtualizarLocadorDto } from '../dto/update-locador.dto';
import { ListarLocadoresQueryDto } from '../dto/listar-locadores-query.dto';

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
  listarLocadores(@Query() query: ListarLocadoresQueryDto) {
    const usuarioIdCorretorLogado = 1;
  
    return this.locadorService.listarLocadores(
      usuarioIdCorretorLogado,
      query.status,
    );
  }

  @Get(':id')
  buscarLocadorPorId(@Param('id', ParseIntPipe) id: number) {
    const usuarioIdCorretorLogado = 1;

    return this.locadorService.buscarLocadorPorId(id, usuarioIdCorretorLogado);
  }

  @Patch(':id')
  atualizarLocador(
    @Param('id', ParseIntPipe) id: number,
    @Body() atualizarLocadorDto: AtualizarLocadorDto,
  ) {
    const usuarioIdCorretorLogado = 1;
  
    return this.locadorService.atualizarLocador(
      id,
      atualizarLocadorDto,
      usuarioIdCorretorLogado,
    );
  }

  @Delete(':id')
  inativarLocador(@Param('id', ParseIntPipe) id: number) {
    const usuarioIdCorretorLogado = 1;
  
    return this.locadorService.inativarLocador(id, usuarioIdCorretorLogado);
  }

}