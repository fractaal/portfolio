import { ref, Ref } from 'vue';
import useAudioVolume from './useAudioVolume';
import { useKeyboardSFX } from './useKeyboardSFX';
import { useFakeTerminal } from './useFakeTerminal';
import { useMusic } from './useMusic';
import { useRouter } from 'vue-router';

export const useFakeTerminalAnimations = (
  term: ReturnType<typeof useFakeTerminal>,
  volume: ReturnType<typeof useAudioVolume>,
  music: ReturnType<typeof useMusic>,
  refs: { showStatsForNerds: Ref<boolean> }
) => {
  const termBusy = ref(false);
  const keyboardSFX = useKeyboardSFX(volume.context, volume.gainNode);
  const router = useRouter();

  async function toggleStatsForNerds() {
    termBusy.value = true;

    if (!term.isLatestLinePrompt()) {
      term.newPromptStringLine();
    }

    await term.wipeOutLatestLine();

    await term.fillInLatestLine('dmesg');

    await term.keyboardSFX.playFullVolume();
    await term.newOutputStringLine();

    refs.showStatsForNerds.value = !refs.showStatsForNerds.value;

    await term.wait(1250 / 2);

    await term.fillInLatestLinePerWord(
      'Statistics ' + (refs.showStatsForNerds.value ? 'enabled' : 'disabled')
    );

    await term.wait(1250 / 2);

    await term.newPromptStringLine();

    termBusy.value = false;
  }

  async function toggleMusicTerm() {
    termBusy.value = true;

    if (!term.isLatestLinePrompt()) {
      term.newPromptStringLine();
    }

    await term.wipeOutLatestLine();

    if (volume.muted.value) {
      await term.fillInLatestLine('unmute');

      await term.keyboardSFX.playFullVolume();
      await term.newOutputStringLine();

      volume.unmute();

      await term.wait(1250);

      await term.fillInLatestLinePerWord('🔊 Music unmuted');
    } else {
      await term.fillInLatestLine('mute');

      await term.keyboardSFX.playFullVolume();
      await term.newOutputStringLine();

      volume.mute();

      await term.wait(1250);

      await term.fillInLatestLinePerWord('🔇 Music muted');
    }

    await term.emulatePressEnterOnLatestLine();

    termBusy.value = false;
  }

  async function clearCommand() {
    termBusy.value = true;
    if (!term.isLatestLinePrompt()) {
      term.newPromptStringLine();
    }

    await term.wipeOutLatestLine();

    await term.fillInLatestLine('clear');
    await term.emulatePressEnterOnLatestLine();

    await term.wait(500);

    await term.clearLines();

    await term.wait(500);

    await term.newPromptStringLine();

    termBusy.value = false;
  }

  async function whoAreYouCommand() {
    termBusy.value = true;
    if (!term.isLatestLinePrompt()) {
      term.newPromptStringLine();
    }

    await term.wipeOutLatestLine();

    await term.wait(250);

    await term.fillInLatestLine('neofetch');

    await term.keyboardSFX.playFullVolume();
    await term.newOutputStringLine(
      "Hey! My name's Benedict Jude A. Rocat -- but I often just go by Ben Jude."
    );

    await term.wait(500);

    await term.newOutputStringLine(
      '🚀 I make cohesive software, visual & acoustic experiences.'
    );

    await term.wait(700);

    await term.wait(700);
    await term.newOutputStringLine();
    await term.wait(250);
    await term.newOutputStringLine(
      'My experience is varied, but mainly focused on the following:'
    );

    await term.wait(1250);
    await term.newOutputStringLine();

    const lines = [
      '💻 WEBDEV',
      '✨ VIDEO & VFX',
      '📦 3D',
      '🎮 GAMEDEV',
      '🎶 MUSIC',
    ];

    for (let i = 0; i < lines.length; i++) {
      await term.newOutputStringLine(' - ' + lines[i]);

      await term.wait(100);
    }

    await term.newPromptStringLine();

    await term.wait(500);

    termBusy.value = false;
  }

  async function rmRf() {
    termBusy.value = true;
    if (!term.isLatestLinePrompt()) {
      term.newPromptStringLine();
    }

    await term.wipeOutLatestLine();

    await term.wait(250);

    await term.fillInLatestLine('rm -rf --no-preserve-root /');

    await term.keyboardSFX.playFullVolume();
    await term.newOutputStringLine();

    await term.wait(500);

    await term.newOutputStringLine(
      'WARNING! This is a non-standard Linux configuration (faux_linux 5.3.1)'
    );

    await term.wait(300);

    await term.newOutputStringLine(
      "DO NOT PROCEED UNLESS This is a scary warning message that's supposed to show up for just a moment!"
    );

    await term.wait(150);
    await term.newOutputStringLine();
    await term.wait(150);

    await term.newOutputStringLine('Are you sure you want to proceed?');

    await term.wait(150);

    await term.newPromptStringLine();

    await term.fillInLatestLine('y');

    await term.emulatePressEnterOnLatestLine();

    function uuidv4() {
      return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
        (
          +c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
        ).toString(16)
      );
    }

    (async () => {
      for (let i = 0; i < 5; i++) {
        await term.newOutputStringLine(`/dev/sd${'abcdefghijklm'[i]}/`);

        await term.wait(Math.random() > 0.9 ? 250 : 20);
      }

      for (let i = 0; i < 100; i++) {
        await term.newOutputStringLine(`/home/users/benjude/${uuidv4()}`);

        await term.wait(Math.random() > 0.99 ? 250 : 20);
      }
    })();

    music.crash();

    await term.wait(750);

    const closeEvent = new CustomEvent('__destroy');

    window.dispatchEvent(closeEvent);

    // If didn't close one way or another, route to fallback page

    router.push('/rmrf');
  }

  async function temporarilyChangeText(newText: string) {
    const wipeOutLine = async () => {
      let first = true;

      const line = term.getLatestLine();
      const content = line.content;

      for (let i = 0; i < content.length; i++) {
        if (termBusy.value) {
          return;
        }

        line.content = content.slice(0, content.length - (i + 1));

        keyboardSFX.play();

        if (first) {
          first = false;
          await new Promise((resolve) => setTimeout(resolve, 100));
        } else {
          await new Promise((resolve) => setTimeout(resolve, 60));
        }
      }
    };

    const fillInLine = async (text: string) => {
      const line = term.getLatestLine();
      const content = line.content;

      for (let i = 0; i < text.length; i++) {
        if (termBusy.value) {
          return;
        }

        line.content = text.slice(0, i + 1);

        keyboardSFX.play();

        if (line.content[line.content.length - 1] === ' ') {
          await new Promise((resolve) => setTimeout(resolve, 140));
        } else {
          await new Promise((resolve) => setTimeout(resolve, 70));
        }
      }
    };

    if (termBusy.value) {
      return;
    }

    await wipeOutLine();

    if (termBusy.value) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 250));

    if (termBusy.value) {
      return;
    }

    await fillInLine(newText);

    if (termBusy.value) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 3500));

    if (termBusy.value) {
      return;
    }

    if (termBusy.value) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  return {
    toggleStatsForNerds,
    toggleMusicTerm,
    clearCommand,
    whoAreYouCommand,
    rmRf,
    temporarilyChangeText,
    termBusy,
  };
};
