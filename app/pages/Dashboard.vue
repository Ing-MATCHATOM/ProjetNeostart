<style scoped>
/* Animation pour le menu utilisateur */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: slideIn 0.2s ease-out;
}

/* Navigation links améliorés */
.nav-link-enhanced {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  color: #374151;
  transition: all 0.3s ease;
}

.nav-link-enhanced:hover {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.nav-link-enhanced.router-link-active {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Cartes de statistiques améliorées */
.stat-card-enhanced {
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card-enhanced:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.stat-icon-enhanced {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
}

.stat-value-enhanced {
  font-size: 1.875rem;
  font-weight: bold;
  margin-top: 0.5rem;
}

.stat-label-enhanced {
  font-size: 0.875rem;
  opacity: 0.9;
}

/* Amélioration de la visibilité des liens actifs */
.router-link-active {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
}

/* Responsive adjustments améliorés */
@media (max-width: 768px) {
  .flex.items-center.space-x-2 > span:not(.font-bold) {
    display: none;
  }
  
  .stat-card-enhanced {
    padding: 1rem;
  }
  
  .stat-value-enhanced {
    font-size: 1.5rem;
  }
}

/* Effet de pulse amélioré */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>