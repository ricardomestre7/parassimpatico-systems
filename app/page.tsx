'use client';

import React, { useState, useMemo } from 'react';
import ParassimpaticoHeader from '@/app/components/ParassimpaticoHeader';
import VagalFrequencyPlayer from '@/app/components/VagalFrequencyPlayer';
import {
  getChakrasAr,
  getSistemasCorporais,
  getCorrelacoesTerapeuticas,
  getProtocolosAr,
  getCamadasConsciencia,
  ChakraAr,
  SistemaCorporal,
  CorrelacaoTerapeutica,
  ProtocoloAr,
  CamadaConsciencia
} from '@/lib/psicossomatica/psicossomaticaService';

export default function PsicossomaticaPage() {
  const [activeTab, setActiveTab] = useState<'correlacoes' | 'centros' | 'sistemas' | 'consciencia' | 'prescricao'>('correlacoes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSystemFilter, setSelectedSystemFilter] = useState<string>('todos');
  const [selectedCorrelation, setSelectedCorrelation] = useState<CorrelacaoTerapeutica | null>(null);

  // Prescription Generator State
  const [patientName, setPatientName] = useState('');
  const [therapistName, setTherapistName] = useState('Dr(a). Terapeuta Integrativo');
  const [prescribedItems, setPrescribedItems] = useState<{
    symptom: string;
    rootConflict: string;
    breathwork: string;
    affirmation: string;
  }[]>([
    {
      symptom: 'Ansiedade & Sobrecarga Mental',
      rootConflict: 'Medo do futuro, hipercontrole e dificuldade em soltar o fluxo',
      breathwork: 'Respiração Coerente 5-5 (5 seg inspira, 5 seg expira) por 12 minutos',
      affirmation: 'Eu confio no fluxo da vida e entrego o controle com serenidade.'
    }
  ]);
  const [clinicalNotes, setClinicalNotes] = useState('Praticar o desbloqueio diafragmático preferencialmente pela manhã ao ar livre ou em ambiente ventilado.');
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  // Data
  const allCorrelations = useMemo(() => getCorrelacoesTerapeuticas(), []);
  const allCentros = useMemo(() => getChakrasAr(), []);
  const allSistemas = useMemo(() => getSistemasCorporais(), []);
  const allProtocolos = useMemo(() => getProtocolosAr(), []);
  const allCamadas = useMemo(() => getCamadasConsciencia(), []);

  // System filters
  const systemOptions = useMemo(() => {
    const set = new Set<string>();
    allCorrelations.forEach(c => {
      if (c.sistema_corporal) set.add(c.sistema_corporal.split('/')[0].trim());
    });
    return Array.from(set);
  }, [allCorrelations]);

  // Filtered correlations
  const filteredCorrelations = useMemo(() => {
    return allCorrelations.filter(c => {
      const matchesSys = selectedSystemFilter === 'todos' || c.sistema_corporal.includes(selectedSystemFilter);
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        c.condicao.toLowerCase().includes(q) ||
        c.sistema_corporal.toLowerCase().includes(q) ||
        c.chakra_afetado.toLowerCase().includes(q) ||
        c.protocolo_principal.toLowerCase().includes(q) ||
        c.notas_clinicas.toLowerCase().includes(q);
      return matchesSys && matchesSearch;
    });
  }, [allCorrelations, selectedSystemFilter, searchQuery]);

  const addCorrelationToPrescription = (corr: CorrelacaoTerapeutica) => {
    const exists = prescribedItems.some(i => i.symptom === corr.condicao);
    if (!exists) {
      setPrescribedItems(prev => [
        ...prev,
        {
          symptom: corr.condicao,
          rootConflict: `Afeta ${corr.chakra_afetado} (${corr.sistema_corporal})`,
          breathwork: corr.protocolo_principal,
          affirmation: corr.notas_clinicas.slice(0, 80) + '...'
        }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Unified Portal Header */}
      <ParassimpaticoHeader />

      {/* Main Calibrated Container with Generous Spacing and Regal Cadence */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 pt-12 sm:pt-16 md:pt-20 pb-28 w-full space-y-12 sm:space-y-16">
        {/* HERO SECTION REGAL */}
        <header className="space-y-5 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-mono font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            SISTEMA CANÔNICO IX · DECODIFICAÇÃO BIOLÓGICA &amp; PRANAYAMA CLÍNICO
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
              Metamedicina &amp; Psicossomática Integrativa
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              Mapeamento dos conflitos biológicos subjacentes a cada manifestação orgânica, correlações dos sistemas fisiológicos integrados com os centros sutis de força, anatomia energética do Prana e modulação respiratória do sistema nervoso autônomo.
            </p>
          </div>

          {/* Badges de Certificação e Arquitetura Canônica */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#0A1E24] border border-orange-500/40 text-orange-300 text-xs font-mono font-semibold flex items-center gap-1.5 shadow-sm">
              <span>◎</span> {allCorrelations.length} Correlações Biológicas
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#0A1E24] border border-[#133E47] text-slate-300 text-xs font-mono flex items-center gap-1.5">
              <span>🫀</span> 12 Sistemas Corporais
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#0A1E24] border border-[#133E47] text-slate-300 text-xs font-mono flex items-center gap-1.5">
              <span>🌬️</span> 7 Centros &amp; Pranayama
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#0A1E24] border border-[#133E47] text-slate-400 text-xs font-mono">
              Safe Creative #2610157331452
            </span>
          </div>
        </header>

        {/* NAVEGAÇÃO FLUTUANTE EM PÍLULA ELEVADA */}
        <section className="bg-[#0A1E24]/90 backdrop-blur-md border border-[#133E47] p-2 rounded-2xl shadow-xl flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('correlacoes')}
            className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'correlacoes'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>◎</span>
            <span>Decodificação Clínica ({allCorrelations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('centros')}
            className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'centros'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>🌀</span>
            <span>7 Centros de Força</span>
          </button>

          <button
            onClick={() => setActiveTab('sistemas')}
            className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'sistemas'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>🫀</span>
            <span>12 Sistemas Corporais</span>
          </button>

          <button
            onClick={() => setActiveTab('consciencia')}
            className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'consciencia'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>🌬️</span>
            <span>Prana &amp; Consciência</span>
          </button>

          <button
            onClick={() => setActiveTab('prescricao')}
            className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'prescricao'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>📋</span>
            <span>Prescrição Psicossomática</span>
          </button>
        </section>

        {/* TAB 1: Decodificação de Sintomas & Emoções */}
        {activeTab === 'correlacoes' && (
          <div className="space-y-8">
            {/* Search and Filters */}
            <div className="bg-[#0A1E24] border border-[#133E47] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar queixa, emoção, órgão ou chakra..."
                    className="w-full bg-[#070B14] border border-slate-700/80 rounded-xl px-4 py-2.5 pl-10 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                  <span className="absolute left-3 top-2.5 text-slate-500 text-sm">🔍</span>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-200"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                  <button
                    onClick={() => setSelectedSystemFilter('todos')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedSystemFilter === 'todos'
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                        : 'bg-slate-900/60 text-slate-400 border border-[#133E47] hover:text-slate-200'
                    }`}
                  >
                    Todos ({allCorrelations.length})
                  </button>
                  {systemOptions.map(sys => (
                    <button
                      key={sys}
                      onClick={() => setSelectedSystemFilter(sys)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedSystemFilter === sys
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                          : 'bg-slate-900/60 text-slate-400 border border-[#133E47] hover:text-slate-200'
                      }`}
                    >
                      {sys}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid of Correlations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredCorrelations.map((corr) => (
                <div
                  key={corr.id}
                  className="bg-[#0A1E24] border border-[#133E47] hover:border-orange-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-orange-950/20 group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950/60 border border-orange-800/40 text-orange-300">
                        {corr.id}
                      </span>
                      <span className="text-[11px] font-mono text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/30">
                        {corr.chakra_afetado}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-orange-300 transition-colors mb-1">
                      {corr.condicao}
                    </h3>

                    <div className="text-xs text-orange-400/90 font-medium mb-3">
                      Sistema: {corr.sistema_corporal}
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#070B14] border border-[#133E47]/80 mb-3 text-xs">
                      <span className="text-slate-400 font-semibold block text-[11px] mb-1">
                        Protocolo Principal:
                      </span>
                      <span className="text-slate-200 font-medium leading-relaxed">
                        {corr.protocolo_principal}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                      {corr.notas_clinicas}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#133E47]/80 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCorrelation(corr)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-xs font-semibold text-slate-200 transition-colors"
                    >
                      Ver Análise Completa
                    </button>
                    <button
                      onClick={() => addCorrelationToPrescription(corr)}
                      title="Adicionar à Prescrição Psicossomática"
                      className="p-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 transition-colors text-sm"
                    >
                      +📋
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: 7 Centros Somato-Emocionais */}
        {activeTab === 'centros' && (
          <div className="space-y-6">
            <VagalFrequencyPlayer />
            <div className="bg-[#0A1E24] border border-[#133E47] rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                <span>🌀</span>
                <span>Os 7 Centros Somato-Emocionais & Conflitos Biológicos</span>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                O corpo físico não adoece sem a participação do biocampo e das emoções não processadas. Cada centro de força atua como um transformador eletroquímico entre a consciência, os plexos nervosos e as glândulas endócrinas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {allCentros.map((chk) => (
                <div
                  key={chk.numero}
                  className="bg-[#0A1E24] border border-[#133E47] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-orange-500/40 transition-all shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 text-orange-400 font-bold text-xs flex items-center justify-center">
                          {chk.numero}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {chk.cor} · Elemento {chk.elemento}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-800/40">
                        {chk.frequencia_Hz} Hz
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1">{chk.nome}</h3>
                    <p className="text-xs text-orange-400 font-medium mb-3">
                      🌬️ {chk.ar_correspondente} ({chk.localizacao})
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {chk.funcao}
                    </p>

                    <div className="space-y-2 mb-4 text-xs">
                      <div className="p-2.5 rounded-xl bg-[#070B14] border border-[#133E47]">
                        <span className="text-slate-400 font-semibold block text-[11px] mb-1">
                          Protocolo de Desbloqueio:
                        </span>
                        <span className="text-slate-300 leading-relaxed">
                          {chk.protocolo_especifico}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-orange-950/20 border border-orange-900/30 flex items-center justify-between">
                        <div>
                          <span className="text-slate-400 text-[11px] block">Mantra:</span>
                          <span className="text-orange-300 font-bold">{chk.mantra}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400 text-[11px] block">Afirmação:</span>
                          <span className="text-slate-300 italic text-[11px]">"{chk.afirmacao}"</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 flex flex-wrap gap-1.5 pt-2 border-t border-[#133E47]/60">
                    <span className="font-semibold text-slate-400">Sintomas somáticos:</span>
                    {chk.sintomas_desequilibrio.map((s, idx) => (
                      <span key={idx} className="bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: 12 Sistemas Corporais */}
        {activeTab === 'sistemas' && (
          <div className="space-y-6">
            <div className="bg-[#0A1E24] border border-[#133E47] rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                <span>🫀</span>
                <span>Os 12 Sistemas Orgânicos & Expressão Somática</span>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                Mapeamento das queixas somáticas físicas como manifestações de conflitos emocionais não processados nos órgãos correspondentes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {allSistemas.map((sys, idx) => (
                <div
                  key={idx}
                  className="bg-[#0A1E24] border border-[#133E47] hover:border-orange-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-md group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                        {sys.sistema}
                      </span>
                      <span className="text-xs font-mono text-teal-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/30">
                        {sys.frequencia_Hz} Hz
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 mb-3">
                      Órgãos: <span className="text-slate-200">{sys.orgaos.join(', ')}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#070B14] border border-[#133E47] mb-3 text-xs">
                      <span className="text-slate-400 text-[11px] block font-semibold mb-1">Ar Prioritário:</span>
                      <span className="text-slate-300">{sys.ar_prioritario}</span>
                    </div>

                    <div className="mb-3">
                      <span className="text-[11px] text-slate-400 block font-semibold mb-1">Indicações Clínicas:</span>
                      <div className="flex flex-wrap gap-1">
                        {sys.indicacoes.map((ind, i) => (
                          <span key={i} className="text-[11px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-[#133E47]">
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 pt-2 border-t border-[#133E47]/60">
                    <strong className="text-orange-400">Referência:</strong> {sys.protocolo_referencia}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Prana & Camadas de Consciência */}
        {activeTab === 'consciencia' && (
          <div className="space-y-6">
            <div className="bg-[#0A1E24] border border-[#133E47] rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                <span>🌬️</span>
                <span>As 5 Camadas Atmosféricas da Consciência Humana</span>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                O Ar não é vazio — é o veículo da consciência (Pneuma / Prana). Cada camada atmosférica da Terra corresponde a um nível de sutilidade nos corpos físico, emocional, mental e intuitivo do ser humano.
              </p>
            </div>

            <div className="space-y-4">
              {allCamadas.map((cam, idx) => (
                <div
                  key={idx}
                  className="bg-[#0A1E24] border border-[#133E47] rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-orange-400">{cam.camada_atmosfera}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-[#133E47] font-mono">
                        {cam.altitude}
                      </span>
                      <span className="text-[10px] text-teal-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40 font-mono">
                        {cam.frequencia}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-200">
                      Dimensão Humana: {cam.dimensao_humana} · {cam.corpo_humano}
                    </div>

                    <p className="text-xs text-rose-300/80">
                      ⚠️ Patologia: {cam.patologia_correspondente}
                    </p>

                    <p className="text-xs text-emerald-300/90 font-medium">
                      ✓ Cura: {cam.cura_correspondente}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block">Tempo Terapêutico:</span>
                    <span className="text-xs font-mono font-bold text-slate-300">{cam.tempo_terapeutico}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Prescrição Psicossomática */}
        {activeTab === 'prescricao' && (
          <div className="space-y-6">
            <div className="bg-[#0A1E24] border border-[#133E47] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
                  <span>📋</span>
                  <span>Emissor de Prescrição Psicossomática & Respiração</span>
                </h2>
                <p className="text-xs text-slate-400 max-w-xl">
                  Gere documentos profissionais com a decodificação dos conflitos emocionais, padrões de respiração terapêutica e afirmações neuroafetivas.
                </p>
              </div>

              <button
                onClick={() => setShowPrescriptionModal(true)}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs shadow-lg shadow-orange-600/30 transition-all flex items-center gap-2 self-start sm:self-auto"
              >
                <span>🖨️</span>
                <span>Visualizar / Imprimir Prescrição ({prescribedItems.length})</span>
              </button>
            </div>

            {/* Prescribed Items in Editor */}
            <div className="space-y-3">
              {prescribedItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0A1E24] border border-[#133E47] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{item.symptom}</span>
                    </div>
                    <div className="text-xs text-orange-400">
                      <strong>Causa Raiz / Conflito:</strong> {item.rootConflict}
                    </div>
                    <div className="text-xs text-slate-300 bg-[#070B14] p-2.5 rounded-xl border border-[#133E47]">
                      <strong>Respiração:</strong> {item.breathwork}
                    </div>
                    <div className="text-xs text-amber-300 italic">
                      "{item.affirmation}"
                    </div>
                  </div>

                  <button
                    onClick={() => setPrescribedItems(prev => prev.filter((_, i) => i !== idx))}
                    className="text-xs text-slate-500 hover:text-rose-400 p-1"
                  >
                    ✕ Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Modal: Detalhes da Correlação */}
      {selectedCorrelation && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1E24] border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedCorrelation(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg p-1"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/40">
                {selectedCorrelation.id}
              </span>
              <span className="text-xs text-slate-400">
                {selectedCorrelation.sistema_corporal}
              </span>
              <span className="text-xs font-mono text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/30">
                {selectedCorrelation.chakra_afetado}
              </span>
            </div>

            <h2 className="text-xl font-bold text-white mb-2">{selectedCorrelation.condicao}</h2>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-[#070B14] rounded-xl border border-[#133E47]">
                <h4 className="font-bold text-orange-400 uppercase tracking-wider mb-1">Protocolo Principal:</h4>
                <p className="text-slate-200 text-sm leading-relaxed">{selectedCorrelation.protocolo_principal}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-400 uppercase tracking-wider mb-1.5">Protocolos Complementares:</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {selectedCorrelation.protocolos_complementares.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-400 uppercase tracking-wider mb-1.5">Notas Clínicas & Eixo Fisiológico:</h4>
                <p className="text-slate-300 leading-relaxed bg-[#070B14] p-3 rounded-xl border border-[#133E47]">
                  {selectedCorrelation.notas_clinicas}
                </p>
              </div>

              <div className="flex justify-between text-slate-400 pt-2 border-t border-[#133E47]">
                <span>Frequência: {selectedCorrelation.frequencia_sessoes}</span>
                <span>Duração: {selectedCorrelation.duracao_protocolo}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#133E47] flex items-center justify-between">
              <button
                onClick={() => setSelectedCorrelation(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  addCorrelationToPrescription(selectedCorrelation);
                  setSelectedCorrelation(null);
                }}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shadow-lg shadow-orange-600/30"
              >
                + Adicionar à Prescrição
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Emissão de Prescrição Psicossomática */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0A1E24] border border-orange-500/40 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setShowPrescriptionModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg p-1"
            >
              ✕
            </button>

            <div className="text-center pb-4 border-b border-[#133E47] mb-6">
              <div className="text-xs uppercase tracking-widest text-orange-400 font-bold mb-1">
                SISTEMA REGENERATIVO · PORTAL IX PSICOSSOMÁTICA
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Prescrição de Desbloqueio Somato-Emocional
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Propriedade Intelectual Safe Creative #2610157331452 · Tecnologia Cylinder Margin
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Nome do Paciente / Interagente:</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Ex: João da Silva"
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Terapeuta Responsável:</label>
                <input
                  type="text"
                  value={therapistName}
                  onChange={(e) => setTherapistName(e.target.value)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Prescribed Items */}
            <div className="mb-6 space-y-3">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
                Plano de Liberação Somato-Emocional ({prescribedItems.length}):
              </span>

              {prescribedItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#070B14] border border-[#133E47] rounded-xl space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.symptom}</span>
                    <button
                      onClick={() => setPrescribedItems(prev => prev.filter((_, i) => i !== idx))}
                      className="text-slate-500 hover:text-rose-400 text-xs p-0.5"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-[11px] text-orange-400">{item.rootConflict}</div>
                  <div className="text-xs text-slate-200 bg-[#0A1E24] p-2 rounded-lg border border-[#133E47]">
                    <strong>Técnica Respiratória:</strong> {item.breathwork}
                  </div>
                  <div className="text-[11px] text-amber-300 italic">"{item.affirmation}"</div>
                </div>
              ))}
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Recomendações Clínicas Adicionais:</label>
              <textarea
                rows={3}
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#133E47]">
              <button
                onClick={() => setShowPrescriptionModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Voltar
              </button>

              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-lg shadow-orange-600/30 flex items-center gap-2"
              >
                <span>🖨️</span>
                <span>Imprimir / Salvar PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
