'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import VagalFrequencyPlayer from '../components/VagalFrequencyPlayer';

export default function MinicursoParassimpaticoPage() {
  const [activeTab, setActiveTab] = useState<'modulo1' | 'modulo2' | 'modulo3' | 'certificado'>('modulo1');
  const [alunoNome, setAlunoNome] = useState('');
  const [notasEstudo, setNotasEstudo] = useState('');
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [certificadoGerado, setCertificadoGerado] = useState(false);

  useEffect(() => {
    try {
      const savedNotas = localStorage.getItem('minicurso_parassimpatico_notas');
      if (savedNotas) setNotasEstudo(savedNotas);
      const savedAluno = localStorage.getItem('minicurso_parassimpatico_aluno');
      if (savedAluno) setAlunoNome(savedAluno);
    } catch {}
  }, []);

  const handleSalvarNotas = () => {
    try {
      localStorage.setItem('minicurso_parassimpatico_notas', notasEstudo);
      localStorage.setItem('minicurso_parassimpatico_aluno', alunoNome);
      alert('Notas guardadas no seu dispositivo com sucesso!');
    } catch {}
  };

  const handleGerarCertificado = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alunoNome.trim()) {
      alert('Por favor, digite o seu nome completo para o certificado.');
      return;
    }
    handleSalvarNotas();
    setCertificadoGerado(true);
    setActiveTab('certificado');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#061318] text-[#E6F4F7] flex flex-col font-sans selection:bg-teal-500/20 selection:text-teal-300">
      <header className="sticky top-0 z-40 bg-[#0A1E24]/90 backdrop-blur-md border-b border-[#133E47] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-teal-400 hover:text-teal-300 text-xs font-semibold flex items-center gap-1.5"
            >
              ← Voltar ao Parassimpático Systems
            </Link>
            <span className="text-xs text-[#133E47]">/</span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8EABB3]">
              MINICURSO CLÍNICO POLIVAGAL & SNA
            </span>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-wider text-teal-300 bg-teal-500/10 border border-teal-500/30 px-2.5 py-0.5 rounded-full">
            Sistema Canónico V · Safe Creative #2610157331452
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 flex-1 space-y-8 w-full">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold bg-teal-400/10 border border-teal-400/30 px-3 py-1 rounded-full">
            Formação Clínica Soberana · Parassimpático Systems
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Teoria Polivagal, Modulação do SNA e Reprogramação Somática
          </h1>
          <p className="text-xs sm:text-sm text-[#8EABB3] leading-relaxed">
            Compreenda os 3 circuitos do sistema nervoso autónomo segundo Stephen Porges, o papel do complexo vagal ventral na cura psicossomática, o eixo cérebro-intestino e a aplicação das frequências sonoras terapêuticas.
          </p>
        </div>

        {/* Gerador de Som Integrado */}
        <VagalFrequencyPlayer />

        {/* Abas do Minicurso */}
        <div className="flex border-b border-[#133E47] gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('modulo1')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all shrink-0 ${
              activeTab === 'modulo1'
                ? 'bg-[#0A1E24] text-teal-300 border-t-2 border-teal-400'
                : 'text-[#8EABB3] hover:text-white'
            }`}
          >
            Módulo 1: Teoria Polivagal de Porges
          </button>
          <button
            onClick={() => setActiveTab('modulo2')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all shrink-0 ${
              activeTab === 'modulo2'
                ? 'bg-[#0A1E24] text-teal-300 border-t-2 border-teal-400'
                : 'text-[#8EABB3] hover:text-white'
            }`}
          >
            Módulo 2: Eixo Cérebro-Intestino & 7 Centros
          </button>
          <button
            onClick={() => setActiveTab('modulo3')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all shrink-0 ${
              activeTab === 'modulo3'
                ? 'bg-[#0A1E24] text-teal-300 border-t-2 border-teal-400'
                : 'text-[#8EABB3] hover:text-white'
            }`}
          >
            Módulo 3: Protocolos de Prescrição Vagal
          </button>
          <button
            onClick={() => setActiveTab('certificado')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all shrink-0 ${
              activeTab === 'certificado'
                ? 'bg-[#0A1E24] text-teal-300 border-t-2 border-teal-400'
                : 'text-[#8EABB3] hover:text-white'
            }`}
          >
            📜 Certificado Safe Creative
          </button>
        </div>

        {/* Conteúdo das Abas */}
        {activeTab === 'modulo1' && (
          <div className="space-y-6 bg-[#0A1E24] p-6 rounded-2xl border border-[#133E47]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🧠</span> Os 3 Estados Neuroceptivos de Stephen Porges
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#061318] p-4 rounded-xl border border-teal-500/30 space-y-2">
                <span className="text-xs font-mono font-bold text-teal-300 uppercase">1. Vagal Ventral</span>
                <h3 className="font-semibold text-white">Segurança & Conexão Social</h3>
                <p className="text-[#8EABB3] text-[11px] leading-relaxed">
                  Circuito mielinizado mais recente. Promove diminuição da frequência cardíaca, relaxamento visceral, escuta empática e homeostase regenerativa celular.
                </p>
              </div>

              <div className="bg-[#061318] p-4 rounded-xl border border-amber-500/30 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">2. Sistema Simpático</span>
                <h3 className="font-semibold text-white">Luta ou Fuga (Mobilização)</h3>
                <p className="text-[#8EABB3] text-[11px] leading-relaxed">
                  Cadeia simpática paravertebral. Liberação de adrenalina e cortisol, taquicardia, vasoconstrição periférica e inibição da motilidade gastrointestinal.
                </p>
              </div>

              <div className="bg-[#061318] p-4 rounded-xl border border-rose-500/30 space-y-2">
                <span className="text-xs font-mono font-bold text-rose-300 uppercase">3. Vagal Dorsal</span>
                <h3 className="font-semibold text-white">Congelamento & Colapso (Imobilização)</h3>
                <p className="text-[#8EABB3] text-[11px] leading-relaxed">
                  Circuito amielínico ancestral. Bradicardia extrema, síncope vasovagal, dissociação psíquica e exaustão visceral em resposta a ameaça esmagadora.
                </p>
              </div>
            </div>

            <label className="flex items-center gap-3 p-3 bg-[#061318] rounded-xl border border-[#133E47] cursor-pointer">
              <input
                type="checkbox"
                checked={check1}
                onChange={(e) => setCheck1(e.target.checked)}
                className="w-4 h-4 accent-teal-400 rounded"
              />
              <span className="text-xs text-[#E6F4F7]">
                Compreendi os 3 circuitos filogenéticos do SNA e a hierarquia polivagal.
              </span>
            </label>
          </div>
        )}

        {activeTab === 'modulo2' && (
          <div className="space-y-6 bg-[#0A1E24] p-6 rounded-2xl border border-[#133E47]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🌿</span> O Eixo Cérebro-Intestino & Os 7 Centros Somáticos do Ar
            </h2>
            <div className="space-y-3 text-xs text-[#8EABB3] leading-relaxed">
              <p>
                80% a 90% das fibras do nervo vago são <strong className="text-teal-300">aferentes</strong> (comunicam do intestino e vísceras para o cérebro). Isso significa que as sensações viscerais determinam diretamente o estado de humor, ansiedade e tomada de decisão através do complexo insular e amígdala.
              </p>
              <div className="p-4 bg-[#061318] rounded-xl border border-[#133E47] space-y-2">
                <h4 className="font-bold text-white">Mapeamento dos 7 Centros Somáticos do Ar:</h4>
                <ul className="list-disc list-inside space-y-1 text-[11px]">
                  <li><strong className="text-teal-300">1º Somático (Raiz/Pélvico):</strong> Segurança de base, medo de escassez e suporte visceral inferior.</li>
                  <li><strong className="text-teal-300">2º Somático (Sacral/Gástrico Baixo):</strong> Prazer, apego, retenção de fluidos e tônus simpático abdominal.</li>
                  <li><strong className="text-teal-300">3º Somático (Plexo Solar):</strong> Vontade, controle, tensão diafragmática e liberação de bílis/ácido gástrico.</li>
                  <li><strong className="text-teal-300">4º Somático (Cardíaco/Tímico):</strong> Vagal ventral puro, coerência cardíaca (HRV) e afeto social.</li>
                  <li><strong className="text-teal-300">5º Somático (Laríngeo/Cervical):</strong> Inervação do vago sobre laringe e faringe, expressão autêntica e deglutição de emoções.</li>
                  <li><strong className="text-teal-300">6º Somático (Frontal/Pineal):</strong> Clareza cognitiva, regulação neuroendócrina circadiana.</li>
                  <li><strong className="text-teal-300">7º Somático (Coronal):</strong> Coerência bioeletromagnética de campo e integração biopsicoespiritual.</li>
                </ul>
              </div>
            </div>

            <label className="flex items-center gap-3 p-3 bg-[#061318] rounded-xl border border-[#133E47] cursor-pointer">
              <input
                type="checkbox"
                checked={check2}
                onChange={(e) => setCheck2(e.target.checked)}
                className="w-4 h-4 accent-teal-400 rounded"
              />
              <span className="text-xs text-[#E6F4F7]">
                Domino as vias aferentes do nervo vago e o reflexo somático nos 7 centros.
              </span>
            </label>
          </div>
        )}

        {activeTab === 'modulo3' && (
          <div className="space-y-6 bg-[#0A1E24] p-6 rounded-2xl border border-[#133E47]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📋</span> Protocolos Clínicos de Modulação Vagal
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#061318] rounded-xl border border-[#133E47] space-y-2">
                <span className="text-[10px] font-mono text-teal-400 uppercase font-bold">Protocolo I</span>
                <h4 className="font-bold text-white">Respiração Coerente 5-5 (0.1 Hz)</h4>
                <p className="text-[#8EABB3] text-[11px] leading-relaxed">
                  Inspirar em 5 segundos, expirar em 5 segundos (6 ciclos por minuto). Sincroniza a arritmia sinusal respiratória (RSA) e maximiza a variabilidade da frequência cardíaca (HRV).
                </p>
              </div>

              <div className="p-4 bg-[#061318] rounded-xl border border-[#133E47] space-y-2">
                <span className="text-[10px] font-mono text-teal-400 uppercase font-bold">Protocolo II</span>
                <h4 className="font-bold text-white">Estimulação Sonora & Vibroacústica (432 Hz - 528 Hz)</h4>
                <p className="text-[#8EABB3] text-[11px] leading-relaxed">
                  A fonação com sons semente (VAM, RAM, YAM, HAM) associada a frequências senoidais puras ativa o ramo auricular do nervo vago e o reflexo do estribo auditivo.
                </p>
              </div>
            </div>

            {/* Caderno de Estudos com Persistência Local */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold text-teal-300 uppercase">
                  Caderno de Notas Clínicas do Terapeuta (Local)
                </h3>
                <button
                  type="button"
                  onClick={handleSalvarNotas}
                  className="text-[11px] text-teal-400 hover:text-teal-300 underline"
                >
                  Salvar Notas
                </button>
              </div>
              <textarea
                value={notasEstudo}
                onChange={(e) => setNotasEstudo(e.target.value)}
                placeholder="Registe aqui as suas reflexões clínicas sobre o tônus vagal e anamneses somáticas..."
                rows={4}
                className="w-full bg-[#061318] border border-[#133E47] rounded-xl p-3 text-xs text-white placeholder-[#5A7E87] focus:outline-none focus:border-teal-400"
              />
            </div>

            <label className="flex items-center gap-3 p-3 bg-[#061318] rounded-xl border border-[#133E47] cursor-pointer">
              <input
                type="checkbox"
                checked={check3}
                onChange={(e) => setCheck3(e.target.checked)}
                className="w-4 h-4 accent-teal-400 rounded"
              />
              <span className="text-xs text-[#E6F4F7]">
                Completei os estudos práticos e estou apto a emitir prescrições vagais.
              </span>
            </label>

            {/* Formulário para Certificado */}
            <form onSubmit={handleGerarCertificado} className="p-4 bg-[#061318] rounded-xl border border-teal-500/40 space-y-3">
              <h4 className="text-xs font-bold text-teal-300 uppercase">
                Emissão de Certificado de Especialização Vagal
              </h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Nome completo do terapeuta / médico"
                  value={alunoNome}
                  onChange={(e) => setAlunoNome(e.target.value)}
                  className="flex-1 bg-[#0A1E24] border border-[#133E47] rounded-xl px-4 py-2 text-xs text-white placeholder-[#5A7E87] focus:outline-none focus:border-teal-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-black text-xs font-extrabold hover:brightness-110 shadow-md transition-all shrink-0"
                >
                  Gerar Certificado
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'certificado' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#8EABB3]">
                Certificado oficial registrado sob a titularidade Safe Creative internacional.
              </p>
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-teal-500 text-black text-xs font-bold hover:bg-teal-400 transition-all shadow-md"
              >
                🖨️ Imprimir / Guardar em PDF
              </button>
            </div>

            <div className="bg-[#0A1E24] p-8 sm:p-12 rounded-3xl border-2 border-teal-500/50 text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="space-y-2">
                <div className="text-xs font-mono tracking-widest text-teal-400 uppercase font-semibold">
                  SISTEMA CANÓNICO V · CYLINDER MARGIN
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  CERTIFICADO DE ESPECIALIZAÇÃO CLÍNICA
                </h2>
                <div className="text-xs text-teal-200/80 font-mono">
                  Teoria Polivagal, Modulação do SNA & Decodificação Psicossomática
                </div>
              </div>

              <div className="py-4 space-y-3 border-y border-[#133E47]">
                <p className="text-xs text-[#8EABB3] uppercase tracking-wider">Certificamos com distinção que</p>
                <p className="text-xl sm:text-2xl font-black text-teal-300 font-serif">
                  {alunoNome || 'Dr(a). Terapeuta Integrativo'}
                </p>
                <p className="text-xs text-[#8EABB3] max-w-xl mx-auto leading-relaxed">
                  concluiu com êxito o programa prático e teórico de decodificação somática, regulação do nervo vago ventral, modulação da variabilidade da frequência cardíaca (HRV) e prescrição terapêutica do Sistema Canónico V.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-[10px] text-[#5A7E87] font-mono">
                <div>
                  <p className="text-[#8EABB3] font-bold">Titular: Ricardo R Pereira</p>
                  <p>Cylinder Margin · cylindermargin.tech</p>
                </div>
                <div className="text-right">
                  <p className="text-teal-400 font-bold">Safe Creative #2610157331452</p>
                  <p>Data: {new Date().toLocaleDateString('pt-PT')}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
