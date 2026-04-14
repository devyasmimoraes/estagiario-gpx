/**
 * AIOX Bridge - Integração entre o Servidor Web e o Framework AIOX Core
 */
const EventEmitter = require('events');
const Diff = require('diff');

class AIOXBridge extends EventEmitter {
    constructor(io) {
        super();
        this.io = io;
        this.approvalPromise = null;
    }

    /**
     * Inicia a orquestração do squad baseado na instrução
     * @param {string} instruction 
     */
    async runWorkflow(instruction) {
        console.log(`[Bridge] Iniciando workflow para: ${instruction}`);
        
        this.io.emit('workflow:started', { instruction });

        try {
            // FASE 1: Max (Gerente)
            await this.executeStep('Max', 'Interpretando instrução e planejando tarefas...');
            await this.simulateDelay(1000);
            this.io.emit('agent:completed', { agent: 'Max', result: 'Plano de execução criado.' });

            // FASE 2: Scout (Pesquisador)
            await this.executeStep('Scout', 'Pesquisando fontes e estruturando briefing...');
            await this.simulateDelay(1500);
            this.io.emit('agent:completed', { agent: 'Scout', result: 'Briefing estruturado com 3 fontes.' });

            // FASE 3: Pen (Redator)
            await this.executeStep('Pen', 'Redigindo conteúdo com base no briefing...');
            await this.simulateDelay(1500);
            this.io.emit('agent:completed', { agent: 'Pen', result: 'Rascunho do conteúdo finalizado.' });

            // FASE 4: Forge (Desenvolvedor) - O NOVO GATEWAY DE APROVAÇÃO
            await this.executeStep('Forge', 'Preparando implementação técnica...');
            await this.simulateDelay(1000);

            // Simulação de alteração de arquivo
            const filePath = 'output/relatorio.md';
            const oldContent = '# Relatório\n\nConteúdo antigo...';
            const newContent = '# Relatório Final\n\nEste é o conteúdo gerado pelo squad Estagiário GPX em 2026.\n\n## Fontes\n- Fonte A\n- Fonte B';

            // Solicita aprovação
            const approved = await this.requestUserApproval(filePath, oldContent, newContent);

            if (!approved) {
                throw new Error('Alteração técnica rejeitada pelo usuário. Abortando workflow.');
            }

            this.io.emit('agent:completed', { agent: 'Forge', result: `Arquivo ${filePath} atualizado com sucesso.` });

            // FASE 5: Gate (Revisor)
            await this.executeStep('Gate', 'Revisando qualidade final do entregável...');
            await this.simulateDelay(1500);
            this.io.emit('agent:completed', { agent: 'Gate', result: 'Conteúdo aprovado (Status: 100%).' });

            // FASE FINAL: Entrega
            this.io.emit('workflow:finished', { 
                status: 'success', 
                message: 'Tarefa concluída com sucesso. Verifique o arquivo output/relatorio.md.' 
            });

        } catch (error) {
            console.error('[Bridge] Erro no workflow:', error);
            this.io.emit('workflow:error', { message: error.message });
        }
    }

    /**
     * Interrompe o workflow e aguarda aprovação do usuário via Socket.io
     */
    requestUserApproval(filePath, oldContent, newContent) {
        return new Promise((resolve) => {
            console.log(`[Bridge] Forge aguardando aprovação para: ${filePath}`);

            // Gera o diff estruturado
            const diff = Diff.createTwoFilesPatch(
                'original/' + filePath,
                'proposto/' + filePath,
                oldContent,
                newContent
            );

            // Envia para o frontend
            this.io.emit('forge:requires_approval', {
                filePath,
                diff,
                explanation: 'Atualização do cabeçalho e inclusão de seções detalhadas conforme briefing.'
            });

            // Armazena a resolução da Promise para ser chamada pelos eventos do socket
            this.approvalPromise = resolve;
        });
    }

    /**
     * Chamado pelo servidor quando o usuário responde ao modal
     */
    handleUserDecision(approved) {
        if (this.approvalPromise) {
            this.approvalPromise(approved);
            this.approvalPromise = null;
        }
    }

    async executeStep(agent, status) {
        console.log(`[Bridge] ${agent}: ${status}`);
        this.io.emit('agent:status', { agent, status });
    }

    simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = AIOXBridge;
