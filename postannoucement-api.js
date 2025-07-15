// Fonctions API pour les demandes de recrutement livreur (postannoucements)

// Créer une nouvelle demande de recrutement
export async function createPostannoucement(formData) {
  try {
    const response = await fetch(`http://88.172.140.59:52000/api/postannoucements`, {
      method: 'POST',
      body: formData // FormData contient déjà les bons headers
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la création de la demande');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur createPostannoucement:', error);
    throw error;
  }
}

// Récupérer toutes les demandes (admin seulement)
export async function getPostannoucements(token) {
  try {
    const response = await fetch(`http://88.172.140.59:52000/api/postannoucements`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des demandes');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur getPostannoucements:', error);
    throw error;
  }
}

// Récupérer une demande spécifique (admin seulement)
export async function getPostannoucement(id, token) {
  try {
    const response = await fetch(`http://88.172.140.59:52000/api/postannoucements/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de la demande');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur getPostannoucement:', error);
    throw error;
  }
}

// Modifier le statut d'une demande (admin seulement)
export async function updatePostannoucementStatus(id, status, notes, token) {
  try {
    const response = await fetch(`http://88.172.140.59:52000/api/postannoucements/${id}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status, notes })
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la modification du statut');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur updatePostannoucementStatus:', error);
    throw error;
  }
}

// Supprimer une demande (admin seulement)
export async function deletePostannoucement(id, token) {
  try {
    const response = await fetch(`http://88.172.140.59:52000/api/postannoucements/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de la demande');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur deletePostannoucement:', error);
    throw error;
  }
}

// Récupérer les statistiques des demandes (admin seulement)
export async function getPostannoucementStats(token) {
  try {
    const response = await fetch(`http://88.172.140.59:52000/api/postannoucements/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des statistiques');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur getPostannoucementStats:', error);
    throw error;
  }
}
