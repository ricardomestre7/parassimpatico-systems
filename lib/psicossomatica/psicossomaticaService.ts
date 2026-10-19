import chakrasArData from './data/chakras-ar.json';
import sistemasData from './data/sistemas-corporais.json';
import correlacoesData from './data/correlacoes-terapeuticas.json';
import protocolosData from './data/protocolos-ar.json';
import modeloData from './data/modelo-transformacao-cura.json';
import ventosData from './data/ventos-planetarios.json';

export interface ChakraAr {
  numero: number;
  nome: string;
  elemento: string;
  ar_correspondente: string;
  frequencia_Hz: number;
  cor: string;
  localizacao: string;
  funcao: string;
  ar_protocolos: string[];
  tecnicas_nature: string[];
  tipo_ar_vibracional: string;
  sintomas_desequilibrio: string[];
  afirmacao: string;
  mantra: string;
  protocolo_especifico: string;
  integracao_nature: string;
}

export interface SistemaCorporal {
  sistema: string;
  orgaos: string[];
  ar_prioritario: string;
  tecnicas: string[];
  indicacoes: string[];
  contra: string[];
  frequencia_Hz: number;
  protocolo_referencia: string;
}

export interface CorrelacaoTerapeutica {
  id: string;
  condicao: string;
  sistema_corporal: string;
  chakra_afetado: string;
  protocolo_principal: string;
  protocolos_complementares: string[];
  ar_indicado: string[];
  frequencia_sessoes: string;
  duracao_protocolo: string;
  notas_clinicas: string;
}

export interface ProtocoloAr {
  id: string;
  nome: string;
  objetivo: string;
  tipo: string;
  categoria: string;
  cronograma?: {
    fase: string;
    foco: string;
    qualidade_ar: string;
    atividades: {
      manha: string[];
      noite: string[];
    };
  }[];
  rotina?: {
    manha?: string[];
    tarde?: string[];
    noite?: string[];
  };
  gatilho?: string;
  acao_imediata?: string[];
  mecanismo?: string;
}

export interface CamadaConsciencia {
  camada_atmosfera: string;
  altitude: string;
  dimensao_humana: string;
  corpo_humano: string;
  patologia_correspondente: string;
  cura_correspondente: string;
  frequencia: string;
  tempo_terapeutico: string;
}

export interface VentoPlanetario {
  id: string;
  nome: string;
  regiao: string;
  natureza: string;
  impacto_emocional: string;
  pratica_recomendada: string;
}

export function getChakrasAr(): ChakraAr[] {
  return (chakrasArData as any).chakras_ar || [];
}

export function getSistemasCorporais(): SistemaCorporal[] {
  return (sistemasData as any).sistemas_corporais || [];
}

export function getCorrelacoesTerapeuticas(): CorrelacaoTerapeutica[] {
  return (correlacoesData as any).correlacoes || [];
}

export function getProtocolosAr(): ProtocoloAr[] {
  return (protocolosData as any).protocolos || [];
}

export function getCamadasConsciencia(): CamadaConsciencia[] {
  return (modeloData as any)?.modelo_camadas_correspondencia_completo?.camadas || [];
}

export function getVentosPlanetarios(): VentoPlanetario[] {
  return (ventosData as any).ventos || [];
}
