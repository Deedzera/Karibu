/* ---- Karibu Admin Panel — JavaScript ---- */

// Admin action handler (approve, reject, suspend, etc.)
function adminAction(action, name) {
  const messages = {
    approve: {
      type: 'success',
      title: 'Fornecedor Aprovado!',
      text: `${name} foi verificado e pode agora operar no marketplace.`
    },
    reject: {
      type: 'warning',
      title: 'Fornecedor Rejeitado',
      text: `A candidatura de ${name} foi rejeitada. O fornecedor será notificado.`
    },
    suspend: {
      type: 'error',
      title: 'Conta Suspensa',
      text: `A conta de ${name} foi suspensa temporariamente.`
    },
    activate: {
      type: 'success',
      title: 'Conta Activada',
      text: `A conta de ${name} foi reactivada com sucesso.`
    },
    delete: {
      type: 'error',
      title: 'Conta Eliminada',
      text: `A conta de ${name} foi eliminada permanentemente.`
    },
    refund: {
      type: 'info',
      title: 'Reembolso Processado',
      text: `O reembolso para a encomenda foi iniciado com sucesso.`
    },
    resolve: {
      type: 'success',
      title: 'Disputa Resolvida',
      text: `A disputa foi marcada como resolvida.`
    },
    feature: {
      type: 'success',
      title: 'Produto Destacado',
      text: `${name} foi adicionado aos prodtos em destaque.`
    },
    remove: {
      type: 'warning',
      title: 'Produto Removido',
      text: `${name} foi removido do catálogo.`
    }
  };

  const msg = messages[action] || { type: 'info', title: 'Acção Executada', text: `A acção "${action}" para ${name} foi concluída.` };

  if (typeof showToast === 'function') {
    showToast(msg.type, msg.title, msg.text, 4000);
  }
}

// Admin confirmation modal
function showConfirmModal(action, name, callback) {
  const modal = document.getElementById('adminConfirmModal');
  if (!modal) return;

  const icons = {
    approve: '<i class="ph-fill ph-check-circle" style="color: var(--success)"></i>',
    reject: '<i class="ph-fill ph-x-circle" style="color: var(--danger)"></i>',
    suspend: '<i class="ph-fill ph-prohibit" style="color: var(--warning)"></i>',
    delete: '<i class="ph-fill ph-trash" style="color: var(--danger)"></i>',
    refund: '<i class="ph-fill ph-arrow-counter-clockwise" style="color: var(--info)"></i>'
  };

  const titles = {
    approve: 'Aprovar Fornecedor?',
    reject: 'Rejeitar Fornecedor?',
    suspend: 'Suspender Conta?',
    delete: 'Eliminar Conta?',
    refund: 'Processar Reembolso?'
  };

  const texts = {
    approve: `Confirmas a aprovação de <strong>${name}</strong>? O fornecedor poderá imediatamente operar no marketplace.`,
    reject: `Confirmas a rejeição de <strong>${name}</strong>? O fornecedor será notificado e poderá reenviar documentos.`,
    suspend: `Confirmas a suspensão de <strong>${name}</strong>? A conta será temporariamente desactivada.`,
    delete: `Confirmas a eliminação permanente de <strong>${name}</strong>? Esta acção não pode ser revertida.`,
    refund: `Confirmas o reembolso para esta encomenda? Os fundos em escrow serão devolvidos ao comprador.`
  };

  const iconEl = modal.querySelector('.confirm-modal-icon');
  const titleEl = modal.querySelector('.confirm-modal-title');
  const textEl = modal.querySelector('.confirm-modal-text');
  const confirmBtn = modal.querySelector('.confirm-btn');

  if (iconEl) iconEl.innerHTML = icons[action] || icons.approve;
  if (titleEl) titleEl.textContent = titles[action] || 'Confirmar Acção?';
  if (textEl) textEl.innerHTML = texts[action] || `Confirmas esta acção para <strong>${name}</strong>?`;

  if (confirmBtn) {
    confirmBtn.onclick = () => {
      closeModal('adminConfirmModal');
      adminAction(action, name);
      if (callback) callback();
    };
  }

  openModal('adminConfirmModal');
}

// Modal helpers
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Table search filter
function initTableSearch() {
  const searchInput = document.querySelector('.admin-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('.admin-table tbody tr');

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

// Filter dropdown handler
function initFilterDropdowns() {
  const selects = document.querySelectorAll('.admin-filter-select');
  selects.forEach(select => {
    select.addEventListener('change', () => {
      const filterValue = select.value.toLowerCase();
      const filterType = select.dataset.filter;
      const rows = document.querySelectorAll('.admin-table tbody tr');

      if (filterValue === 'all' || filterValue === '') {
        rows.forEach(row => row.style.display = '');
        return;
      }

      rows.forEach(row => {
        const cell = row.querySelector(`[data-${filterType}]`);
        if (cell) {
          const cellValue = cell.dataset[filterType]?.toLowerCase() || cell.textContent.toLowerCase();
          row.style.display = cellValue.includes(filterValue) ? '' : 'none';
        } else {
          // Fallback: search entire row
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(filterValue) ? '' : 'none';
        }
      });
    });
  });
}

// Close modals on backdrop click
function initModalBackdropClose() {
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

// Initialize admin-specific functionality
document.addEventListener('DOMContentLoaded', () => {
  initTableSearch();
  initFilterDropdowns();
  initModalBackdropClose();
});
