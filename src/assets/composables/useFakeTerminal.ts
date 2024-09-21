import { ref } from 'vue';
import { useKeyboardSFX } from './useKeyboardSFX';

type Line = {
  type: string;
  content: string;
  classNames?: string;
};

export const useFakeTerminal = () => {
  const lines = ref<Line[]>([]);

  const keyboardSFX = useKeyboardSFX();

  const wipeOutLine = async (index: number) => {
    let first = true;

    const line = lines.value[index].content;

    for (let i = 0; i < line.length; i++) {
      lines.value[index].content = line.slice(0, line.length - (i + 1));

      if (lines.value[index].type === 'prompt') {
        keyboardSFX.play();
      }

      if (first) {
        first = false;
        await new Promise((resolve) => setTimeout(resolve, 100));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
    }
  };

  const wipeOutLatestLine = async () => {
    await wipeOutLine(lines.value.length - 1);
  };

  const fillInLine = async (index: number, text: string) => {
    for (let i = 0; i < text.length; i++) {
      lines.value[index].content = text.slice(0, i + 1);

      if (lines.value[index].type === 'prompt') {
        keyboardSFX.play();
      }

      if (
        lines.value[index].content[lines.value[index].content.length - 1] ===
        ' '
      ) {
        await new Promise((resolve) => setTimeout(resolve, 140));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 70));
      }
    }
  };

  const fillInLinePerWord = async (index: number, text: string) => {
    const words = text.split(' ');

    for (let i = 0; i < words.length; i++) {
      lines.value[index].content += words[i] + ' ';

      if (lines.value[index].type === 'prompt') {
        keyboardSFX.play();
      }

      await new Promise((resolve) => setTimeout(resolve, 5));
    }
  };

  const fillInLatestLinePerWord = async (text: string) => {
    await fillInLinePerWord(lines.value.length - 1, text);
  };

  const fillInLatestLine = async (text: string) => {
    await fillInLine(lines.value.length - 1, text);
  };

  const updateLatestLine = (content: string) => {
    lines.value[lines.value.length - 1].content = content;
  };

  const updateLine = (index: number, content: string) => {
    lines.value[index].content = content;
  };

  const newPromptStringLine = (content?: string) => {
    lines.value.push({ type: 'prompt', content: content ?? '' });
  };

  const newOutputStringLine = (content?: string) => {
    lines.value.push({ type: 'output', content: content ?? '' });
  };

  const clearLines = () => {
    lines.value = [];
  };

  const emulatePressEnterOnLatestLine = async () => {
    // const latestLine = lines.value[lines.value.length - 1];

    keyboardSFX.playFullVolume();
    newOutputStringLine();
    newPromptStringLine();
  };

  const emulatePressEnterOnLatestLineWipeOut = async () => {
    const latestLine = lines.value[lines.value.length - 1];

    keyboardSFX.playFullVolume();
    latestLine.content = '';
  };

  const isLatestLinePrompt = () => {
    return lines.value[lines.value.length - 1].type === 'prompt';
  };

  const isLatestLineOutput = () => {
    return lines.value[lines.value.length - 1].type === 'output';
  };

  const getLatestLine = () => {
    return lines.value[lines.value.length - 1];
  };

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  newPromptStringLine();

  return {
    lines,
    updateLatestLine,
    updateLine,
    newOutputStringLine,
    newPromptStringLine,
    clearLines,
    wipeOutLine,
    wipeOutLatestLine,
    fillInLine,
    fillInLatestLine,
    emulatePressEnterOnLatestLine,
    emulatePressEnterOnLatestLineWipeOut,
    fillInLinePerWord,
    fillInLatestLinePerWord,
    isLatestLineOutput,
    isLatestLinePrompt,
    keyboardSFX,
    getLatestLine,
    wait,
  };
};
