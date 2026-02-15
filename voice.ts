// Voice recognition service with multilingual support
export class VoiceRecognitionService {
  private recognition: any;
  private isListening: boolean = false;
  
  constructor() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }
  
  isSupported(): boolean {
    return !!this.recognition;
  }
  
  startListening(
    language: 'hi-IN' | 'en-IN' | 'en-US',
    onResult: (transcript: string) => void,
    onError?: (error: string) => void
  ): void {
    if (!this.recognition) {
      onError?.('Speech recognition not supported in this browser');
      return;
    }
    
    if (this.isListening) {
      return;
    }
    
    this.recognition.lang = language;
    this.isListening = true;
    
    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      this.isListening = false;
    };
    
    this.recognition.onerror = (event: any) => {
      onError?.(event.error);
      this.isListening = false;
    };
    
    this.recognition.onend = () => {
      this.isListening = false;
    };
    
    try {
      this.recognition.start();
    } catch (error) {
      this.isListening = false;
      onError?.('Failed to start recognition');
    }
  }
  
  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
  
  getIsListening(): boolean {
    return this.isListening;
  }
}

// Text-to-speech service
export class TextToSpeechService {
  private synth: SpeechSynthesis | null;
  private enabled: boolean = true;
  
  constructor() {
    this.synth = 'speechSynthesis' in window ? window.speechSynthesis : null;
  }
  
  isSupported(): boolean {
    return !!this.synth;
  }
  
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
  
  getEnabled(): boolean {
    return this.enabled;
  }
  
  speak(text: string, lang: string = 'hi-IN'): void {
    if (!this.synth || !this.enabled) {
      return;
    }
    
    // Cancel any ongoing speech
    this.synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    this.synth.speak(utterance);
  }
  
  stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

// Singleton instances
export const voiceRecognition = new VoiceRecognitionService();
export const textToSpeech = new TextToSpeechService();
