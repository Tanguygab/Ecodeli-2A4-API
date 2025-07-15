<script setup lang="ts">
import { ref } from 'vue'
import { createPostannoucement } from '@/api/postannoucement-api.js'

const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  justificatif: null as File | null
})

const isSubmitting = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

function handleFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  form.value.justificatif = input.files[0]
}

async function submitForm() {
  // Validation
  if (!form.value.firstname || !form.value.lastname || !form.value.email || !form.value.phone) {
    message.value = 'Tous les champs sont obligatoires'
    messageType.value = 'error'
    return
  }

  if (!form.value.justificatif) {
    message.value = 'Veuillez sélectionner un fichier justificatif'
    messageType.value = 'error'
    return
  }

  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    message.value = 'Format d\'email invalide'
    messageType.value = 'error'
    return
  }

  // Validation téléphone
  const phoneRegex = /^[0-9]{10}$/
  if (!phoneRegex.test(form.value.phone.replace(/\s/g, ''))) {
    message.value = 'Format de téléphone invalide (10 chiffres)'
    messageType.value = 'error'
    return
  }

  isSubmitting.value = true
  message.value = ''

  try {
    const formData = new FormData()
    formData.append('firstname', form.value.firstname)
    formData.append('lastname', form.value.lastname)
    formData.append('email', form.value.email)
    formData.append('phone', form.value.phone)
    formData.append('justificatif', form.value.justificatif)

    await createPostannoucement(formData)
    
    message.value = 'Demande envoyée avec succès ! Vous recevrez une réponse sous 48h.'
    messageType.value = 'success'
    
    // Réinitialiser le formulaire
    form.value = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      justificatif: null
    }
    
    // Réinitialiser le champ fichier
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) fileInput.value = ''
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
    message.value = 'Erreur lors de l\'envoi de la demande. Veuillez réessayer.'
    messageType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

function clearMessage() {
  message.value = ''
}
</script>

<template>
  <div class="container">
    <div class="box">
      <h2 class="title is-4 mb-4">Demande de recrutement livreur</h2>
      
      <!-- Message de retour -->
      <div v-if="message" :class="['notification', messageType === 'success' ? 'is-success' : 'is-danger']">
        <button class="delete" @click="clearMessage"></button>
        {{ message }}
      </div>

      <form @submit.prevent="submitForm">
        <div class="field">
          <label class="label">Prénom *</label>
          <div class="control">
            <input 
              v-model="form.firstname" 
              class="input" 
              type="text" 
              placeholder="Votre prénom"
              :disabled="isSubmitting"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Nom *</label>
          <div class="control">
            <input 
              v-model="form.lastname" 
              class="input" 
              type="text" 
              placeholder="Votre nom"
              :disabled="isSubmitting"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Email *</label>
          <div class="control">
            <input 
              v-model="form.email" 
              class="input" 
              type="email" 
              placeholder="votre.email@example.com"
              :disabled="isSubmitting"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Téléphone *</label>
          <div class="control">
            <input 
              v-model="form.phone" 
              class="input" 
              type="tel" 
              placeholder="0123456789"
              :disabled="isSubmitting"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Pièce justificative *</label>
          <div class="control">
            <div class="file is-boxed">
              <label class="file-label">
                <input 
                  class="file-input" 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  @change="handleFileChange"
                  :disabled="isSubmitting"
                  required
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choisir un fichier...
                  </span>
                </span>
                <span class="file-name" v-if="form.justificatif">
                  {{ form.justificatif.name }}
                </span>
              </label>
            </div>
            <p class="help">Formats acceptés : PDF, JPG, PNG (Max 5MB)</p>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button 
              class="button is-success" 
              type="submit"
              :class="{ 'is-loading': isSubmitting }"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande' }}
            </button>
          </div>
        </div>
      </form>

      <div class="content mt-4">
        <h5>Informations importantes :</h5>
        <ul>
          <li>Tous les champs marqués d'un * sont obligatoires</li>
          <li>Vous recevrez une réponse sous 48h à l'adresse email fournie</li>
          <li>La pièce justificative doit être un document valide (permis de conduire, carte d'identité, etc.)</li>
          <li>Votre candidature sera examinée par notre équipe de recrutement</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.box {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.field {
  margin-bottom: 1.5rem;
}

.label {
  font-weight: 600;
  color: #363636;
}

.help {
  font-size: 0.875rem;
  color: #757575;
  margin-top: 0.5rem;
}

.notification {
  margin-bottom: 1rem;
}

.file-name {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
