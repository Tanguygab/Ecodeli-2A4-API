<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getPostannoucements, updatePostannoucementStatus, deletePostannoucement, getPostannoucementStats } from '@/api/postannoucement-api.js'

interface Postannoucement {
  _id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  justificatif: string
  status: 'pending' | 'accepted' | 'rejected'
  submission_date: string
  reviewed_by?: any
  reviewed_date?: string
  notes?: string
}

interface Stats {
  pending: number
  accepted: number
  rejected: number
  total: number
}

const postannoucements = ref<Postannoucement[]>([])
const stats = ref<Stats>({ pending: 0, accepted: 0, rejected: 0, total: 0 })
const loading = ref(false)
const selectedStatus = ref('all')
const token = ref('') // À récupérer depuis votre store/session

// Modales
const showModal = ref(false)
const selectedItem = ref<Postannoucement | null>(null)
const modalNotes = ref('')

onMounted(async () => {
  await loadData()
})

async function loadData() {
  loading.value = true
  try {
    const [postannoucementsData, statsData] = await Promise.all([
      getPostannoucements(token.value),
      getPostannoucementStats(token.value)
    ])
    
    postannoucements.value = postannoucementsData
    stats.value = statsData
  } catch (error) {
    console.error('Erreur lors du chargement:', error)
  } finally {
    loading.value = false
  }
}

const filteredPostannoucements = computed(() => {
  if (selectedStatus.value === 'all') return postannoucements.value
  return postannoucements.value.filter(item => item.status === selectedStatus.value)
})

async function updateStatus(id: number, status: string, notes: string = '') {
  try {
    await updatePostannoucementStatus(id, status, notes, token.value)
    await loadData() // Recharger les données
    closeModal()
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
  }
}

async function deleteItem(id: number) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) return
  
  try {
    await deletePostannoucement(id, token.value)
    await loadData() // Recharger les données
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
  }
}

function openModal(item: Postannoucement) {
  selectedItem.value = item
  modalNotes.value = item.notes || ''
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedItem.value = null
  modalNotes.value = ''
}

function getStatusColor(status: string) {
  switch (status) {
    case 'pending': return 'is-warning'
    case 'accepted': return 'is-success'
    case 'rejected': return 'is-danger'
    default: return 'is-light'
  }
}

function getStatusText(status: string) {
  switch (status) {
    case 'pending': return 'En attente'
    case 'accepted': return 'Acceptée'
    case 'rejected': return 'Rejetée'
    default: return status
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('fr-FR')
}
</script>

<template>
  <div class="container">
    <div class="section">
      <h1 class="title">Gestion des demandes de recrutement</h1>
      
      <!-- Statistiques -->
      <div class="columns">
        <div class="column">
          <div class="box has-text-centered">
            <p class="heading">Total</p>
            <p class="title">{{ stats.total }}</p>
          </div>
        </div>
        <div class="column">
          <div class="box has-text-centered has-background-warning-light">
            <p class="heading">En attente</p>
            <p class="title">{{ stats.pending }}</p>
          </div>
        </div>
        <div class="column">
          <div class="box has-text-centered has-background-success-light">
            <p class="heading">Acceptées</p>
            <p class="title">{{ stats.accepted }}</p>
          </div>
        </div>
        <div class="column">
          <div class="box has-text-centered has-background-danger-light">
            <p class="heading">Rejetées</p>
            <p class="title">{{ stats.rejected }}</p>
          </div>
        </div>
      </div>

      <!-- Filtres -->
      <div class="box">
        <div class="field">
          <label class="label">Filtrer par statut</label>
          <div class="control">
            <div class="select">
              <select v-model="selectedStatus">
                <option value="all">Tous</option>
                <option value="pending">En attente</option>
                <option value="accepted">Acceptées</option>
                <option value="rejected">Rejetées</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Tableau des demandes -->
      <div class="box">
        <div v-if="loading" class="has-text-centered">
          <div class="button is-loading is-static">Chargement...</div>
        </div>
        
        <div v-else-if="filteredPostannoucements.length === 0" class="has-text-centered">
          <p>Aucune demande trouvée.</p>
        </div>
        
        <table v-else class="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredPostannoucements" :key="item._id">
              <td>{{ item.firstname }} {{ item.lastname }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ formatDate(item.submission_date) }}</td>
              <td>
                <span class="tag" :class="getStatusColor(item.status)">
                  {{ getStatusText(item.status) }}
                </span>
              </td>
              <td>
                <div class="buttons">
                  <button 
                    class="button is-small is-info" 
                    @click="openModal(item)"
                  >
                    Gérer
                  </button>
                  <a 
                    :href="item.justificatif" 
                    target="_blank" 
                    class="button is-small is-link"
                  >
                    Justificatif
                  </a>
                  <button 
                    class="button is-small is-danger" 
                    @click="deleteItem(item._id)"
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de gestion -->
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Gérer la demande - {{ selectedItem?.firstname }} {{ selectedItem?.lastname }}
          </p>
          <button class="delete" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <div v-if="selectedItem">
            <div class="field">
              <label class="label">Informations du candidat</label>
              <div class="content">
                <p><strong>Nom :</strong> {{ selectedItem.firstname }} {{ selectedItem.lastname }}</p>
                <p><strong>Email :</strong> {{ selectedItem.email }}</p>
                <p><strong>Téléphone :</strong> {{ selectedItem.phone }}</p>
                <p><strong>Date de soumission :</strong> {{ formatDate(selectedItem.submission_date) }}</p>
                <p><strong>Statut actuel :</strong> 
                  <span class="tag" :class="getStatusColor(selectedItem.status)">
                    {{ getStatusText(selectedItem.status) }}
                  </span>
                </p>
              </div>
            </div>

            <div class="field">
              <label class="label">Notes</label>
              <div class="control">
                <textarea 
                  v-model="modalNotes" 
                  class="textarea" 
                  placeholder="Ajoutez des notes sur cette demande..."
                ></textarea>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button 
            class="button is-success" 
            @click="updateStatus(selectedItem!._id, 'accepted', modalNotes)"
          >
            Accepter
          </button>
          <button 
            class="button is-danger" 
            @click="updateStatus(selectedItem!._id, 'rejected', modalNotes)"
          >
            Rejeter
          </button>
          <button 
            class="button is-warning" 
            @click="updateStatus(selectedItem!._id, 'pending', modalNotes)"
          >
            Remettre en attente
          </button>
          <button class="button" @click="closeModal">Annuler</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section {
  padding: 2rem;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

.table td {
  vertical-align: middle;
}

.has-background-warning-light {
  background-color: #fffbeb !important;
}

.has-background-success-light {
  background-color: #f0f9f0 !important;
}

.has-background-danger-light {
  background-color: #fef5f5 !important;
}
</style>
