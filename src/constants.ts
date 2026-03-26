export interface StepLink {
  label: string;
  url: string;
  index?: number;
}

export interface Step {
  title: string;
  description: string;
  details: string[];
  tips?: string[];
  warning?: string;
  warningLink?: { label: string; url?: string; phaseId?: string };
  links?: StepLink[];
}

export interface Phase {
  id: string;
  title: string;
  icon: string;
  intro?: string;
  steps: Step[];
}

export const PHASES: Phase[] = [
  {
    id: 'benefits',
    title: 'Bénéfices Clés du Déploiement',
    icon: 'Zap',
    intro: 'Guide interactif basé sur les procédures de déploiement Google for Education & Microsoft Entra ID. Réalisé en collaboration avec Guillaume Duchateau de l\'AR de Fragnée.<br /><br />En complément de ce guide, n\'hésitez pas à consulter <a href="https://docs.google.com/document/d/12rhmsCZaBvjXWSrc4CoGrierUcKkPu7CVJtnrX6-sIk/edit?tab=t.27en7wjmvymm" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">le document réalisé par Samuel Musique</a> dans lequel vous trouverez d\'autres trucs & astuces.',
    steps: [
      {
        title: 'Avantages de la Fédération',
        description: 'Pourquoi unifier vos environnements Google et Microsoft ?',
        details: [
          '<strong>Identité Unique (SSO)</strong> : Un seul mot de passe (Microsoft) pour tout. Moins de support, plus de simplicité.',
          '<strong>Provisioning Automatique</strong> : Les comptes sont créés et rangés dans les bonnes UO automatiquement via Entra ID.',
          '<strong>Sécurité Différenciée</strong> : Règles strictes pour les élèves et accès IA pour les professeurs via la structure d\'UO.',
          '<strong>Maintenance Simplifiée</strong> : Possibilité de forcer une réévaluation complète des comptes en cas de changement de structure.'
        ]
      },
      {
        title: 'Sécurité & Contrôle',
        description: 'Garantir la sécurité des données de l\'établissement.',
        details: [
          'Utilisation de Gemini et NotebookLM dans un cadre respectueux du RGPD.',
          'Pas de serveurs locaux requis.',
          'Protection automatisée des mineurs.'
        ]
      }
    ]
  },
  {
    id: 'prerequisites',
    title: 'Phase 1 : Prérequis et Inscription',
    icon: 'Settings',
    steps: [
      {
        title: 'Enregistrement et vérification du domaine',
        description: 'Ouvrir un Google Workspace for Education (Gratuit).',
        details: [
          'Suivez l\'étape 2 du menu Manuel interactif'
        ],
        links: [
          {
            label: 'S\'inscrire à Google Workspace',
            url: 'https://sites.google.com/edunum.be/geg-fwb/d%C3%A9marrer-avec-google-workspace/manuel-interactif'
          }
        ],
        warning: 'Si vous recevez un message disant "Ce domaine est déjà utilisé", ',
        warningLink: {
          label: 'rendez-vous à la phase 8',
          phaseId: 'domain-contestation'
        }
      },
      {
        title: 'Configuration DNS',
        description: 'Valider la propriété du domaine sans perturber la messagerie actuelle.',
        details: [
          'Ajoutez l\'enregistrement TXT fourni par Google dans votre interface DNS (Centre d\'administration Microsoft 365 > Paramètres > Domaines).',
          'IMPORTANT : Ne configurez PAS les enregistrements MX de Google pour conserver Outlook comme messagerie principale.'
        ],
        links: [
          {
            label: 'Admin Microsoft 365',
            url: 'https://admin.microsoft.com'
          }
        ],
        tips: [
          'La validation DNS peut prendre de quelques minutes à 48 heures.'
        ]
      }
    ]
  },
  {
    id: 'uo-structure',
    title: 'Phase 2 : Structure des Unités Organisationnelles (UO)',
    icon: 'GraduationCap',
    steps: [
      {
        title: 'Arborescence des UO',
        description: 'Préparer le tri des utilisateurs <strong><u>avant la synchronisation</u></strong>.',
        details: [
          'Créez l\'arborescence dans Annuaire > Unités organisationnelles.',
          'Exemple recommandé : /nomecole_Plus_18 (Personnel, Profs, Admin) et /nomecole_Moins_18 (Élèves).',
          'Cette étape est CRUCIALE à réaliser AVANT de lancer la synchronisation.'
        ],
        links: [
          {
            label: 'Console Google Admin',
            url: 'https://admin.google.com/ac/orgunits'
          }
        ]
      }
    ]
  },
  {
    id: 'sync-setup',
    title: 'Phase 3 : Synchronisation de l\'Annuaire',
    icon: 'Users',
    steps: [
      {
        title: 'Lien Cloud OAuth',
        description: 'Établir la connexion sécurisée entre Google et Microsoft.',
        details: [
          'Dans Google Admin : Annuaire > Synchronisation des données.',
          'Cliquez sur "Ajouter Azure Active Directory".',
          'Connectez-vous avec vos identifiants Administrateur Global Microsoft.'
        ],
        links: [
          {
            label: 'Synchronisation Google',
            url: 'https://admin.google.com/ac/sync/externaldirectories'
          }
        ]
      },
      {
        title: 'Sélection et Gestion des Groupes',
        description: 'Définir quels utilisateurs et groupes seront synchronisés.',
        details: [
          'Choisissez les groupes à synchroniser (ex: Group_Professeur, Group_Eleve).',
          'Les membres des groupes dynamiques Microsoft sont synchronisés individuellement sans problème.',
          'Objets Groupes : Les groupes dynamiques ne se synchronisent pas en  tant que "listes de diffusion". Pour synchroniser l\'objet "Groupe" lui même, utilisez des groupes statiques ou Microsoft 365 (avec mail). '
        ]
      }
    ]
  },
  {
    id: 'sso-saml',
    title: 'Phase 4 : Accès Unique (SSO SAML)',
    icon: 'ShieldCheck',
    steps: [
      {
        title: 'Configuration Google Admin',
        description: 'Récupérer les informations nécessaires pour Microsoft.',
        details: [
          'Sécurité > Authentification > SSO avec un fournisseur tiers.',
          'Créez un profil SAML et récupérez l\'ID d\'entité et l\'URL ACS.'
        ],
        links: [
          {
            label: 'Sécurité Google Admin',
            url: 'https://admin.google.com/ac/security/sso'
          }
        ]
      },
      {
        title: 'Configuration Microsoft Entra ID',
        description: 'Délégation de l\'authentification à Microsoft',
        details: [
          'Applications d\'entreprise > Google Cloud / G Suite Connector > Authentification unique > SAML.',
          'Collez l\'ID d\'entité et l\'URL ACS de Google.',
          'URL de connexion : https://www.google.com/a/[domaine]/ServiceLogin?continue=https://drive.google.com',
          'Vérifiez que l\'Identifiant d\'utilisateur unique est user.userprincipalname.',
          'Téléchargez le Certificat (Base64).'
        ],
        links: [
          {
            label: 'Microsoft Entra ID',
            url: 'https://entra.microsoft.com'
          }
        ]
      },
      {
        title: 'Finalisation Google',
        description: 'Importer le certificat et activer le SSO.',
        details: [
          'Retournez dans le profil SSO de Google.',
          'Collez l\'URL de connexion de Microsoft et importez le Certificat (.cer).',
          'Cochez "Utiliser un émetteur spécifique au domaine".'
        ]
      }
    ]
  },
  {
    id: 'provisioning',
    title: 'Phase 5 : Provisioning Automatique',
    icon: 'Zap',
    steps: [
      {
        title: 'Expression de tri (Mapping)',
        description: 'Automatiser le placement des comptes dans les bonnes UO.',
        details: [
          'Dans Entra ID, modifiez l\'attribut orgUnitPath.',
          'Type : Expression.',
          'Expression : Switch([department], "/nomecole_Plus_18", "1", "/nomecole_Moins_18", "2", ...)'
        ],
        tips: [
          'Définissez une valeur par défaut (ex: /nomecole_Plus_18) si l\'attribut department est nul.'
        ]
      },
      {
        title: 'Lancement de la Synchro',
        description: 'Valider et démarrer le flux de données.',
        details: [
          'Utilisez "Test (on-demand provisioning)" sur quelques comptes pour valider l\'UO de destination.',
          'Cliquez sur "Start provisioning" pour lancer la synchronisation globale.'
        ]
      }
    ]
  },
  {
    id: 'security-ia',
    title: 'Phase 6 : Sécurité et IA (Gemini)',
    icon: 'Cpu',
    steps: [
      {
        title: 'Réglages Élèves (Moins_18)',
        description: 'CONSEILS : Protéger les mineurs et limiter les interactions externes.',
        details: [
          'Drive : Partage externe DÉSACTIVÉ, Réception externe Décochée.',
          'IA (Gemini) : à vous de choisir si vous activez Gemini pour les élèves ou non.'
        ]
      },
      {
        title: 'Réglages Personnel (Plus_18)',
        description: 'Ouvrir les outils d\'IA générative pour le personnel.',
        details: [
          'IA (Gemini) : Activez "Applis en accès anticipé" (NotebookLM, Gems).'
        ]
      }
    ]
  },
  {
    id: 'maintenance',
    title: 'Phase 7 : Maintenance et Reset',
    icon: 'Lock',
    steps: [
      {
        title: 'Réinitialisation de la Synchro',
        description: 'Forcer une mise à jour complète si les UO ne se mettent pas à jour',
        details: [
          '1. Arrêtez l\'approvisionnement dans Entra ID.',
          '2. Cliquez sur "Réinitialiser l\'état actuel" (Clear current state/Watermarks).',
          '3. Relancez l\'approvisionnement.'
        ],
        tips: [
          'Cela force Microsoft à réévaluer chaque compte par rapport à la nouvelle configuration.'
        ]
      }
    ]
  },
  {
    id: 'domain-contestation',
    title: 'Phase 8 : Procédure de contestation de domaine',
    icon: 'ShieldCheck',
    intro: "Cette procédure vous permettra de libérer votre domaine pour l'inscription à Google for Education. Elle nécessite une vérification de la propriété du domaine via DNS et peut prendre jusqu'à 72 heures, le temps que les administrateurs actuels puissent contester la prise de contrôle.<br /><br />Cela peut être utile si quelqu’un a créé une adresse Gmail grand public en utilisant le nom de domaine de votre école par exemple.",
    steps: [
      {
        title: 'Créer un ticket d\'assistance',
        description: 'Veuillez compléter le Formulaire de contestation de domaine.',
        details: [
          'Ajoutez le domaine que vous souhaitez libérer.',
          'Ajoutez vos coordonnées.',
          '<strong>Note</strong> : Utilisez un courriel hors domaine (par exemple, Gmail) pour la communication, car l\'adresse électronique du domaine peut ne pas être fonctionnelle pour les tickets d\'assistance.'
        ],
        links: [
          {
            label: 'Formulaire de contestation de domaine',
            url: 'https://toolbox.googleapps.com/apps/recovery/domain_in_use'
          }
        ]
      },
      {
        title: 'Option d\'inscription',
        description: 'Sélectionnez la deuxième option ”Non, c\'est la première fois que je m\'inscris avec ce domaine.”',
        details: []
      },
      {
        title: 'Vérification DNS',
        description: 'Prouver la propriété du domaine via un enregistrement CNAME ou TXT.',
        details: [
          'Ajoutez l\'enregistrement fourni dans votre console DNS.',
          'Une fois l\'enregistrement saisi et après avoir attendu sa propagation, cliquez sur <strong>Vérifier à nouveau</strong>.'
        ],
        tips: [
          'Vous pouvez choisir d’ajouter un enregistrement CNAME ou TXT.',
          'Vous recevrez un courriel contenant le numéro du ticket ouvert. Même si vous fermez la page, vous pourrez toujours le récupérer.'
        ]
      },
      {
        title: 'Délai de contestation (72h)',
        description: 'Processus de validation et d\'attente.',
        details: [
          'Un processus de 72 heures est lancé au cours duquel les administrateurs actuels sont informés.',
          'L\'assistance Google tentera de les contacter. En l\'absence de réponse (ou si la propriété est confirmée par DNS), l\'assistance libérera le domaine.'
        ]
      },
      {
        title: 'Résultat et Réinscription',
        description: 'Libération du domaine pour Workspace for Education.',
        details: [
          'Les comptes existants deviennent des comptes consommateurs non gérés.',
          'Le domaine est libéré pour une nouvelle inscription à Workspace for Education.'
        ]
      },
      {
        title: 'Utilisateurs non gérés',
        description: 'Gérer les comptes créés individuellement avec le domaine de l\'organisation.',
        details: [
          'Certains employés ou étudiants peuvent utiliser des comptes non gérés.',
          'Cela peut entraîner des conflits de noms lors de la création de comptes gérés.',
          'Une fois votre Workspace approuvé, identifiez et importez ces comptes.'
        ],
        links: [
          {
            label: 'Guide : Trouver et ajouter des utilisateurs non gérés',
            url: 'https://knowledge.workspace.google.com/admin/users/use-the-transfer-tool-to-migrate-unmanaged-users?visit_id=639062464131598155-2395291733&rd=1&hl=fr'
          }
        ]
      }
    ]
  }
];
