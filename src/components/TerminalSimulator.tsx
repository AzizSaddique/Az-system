import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, CornerDownLeft } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}

export const TerminalSimulator: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: '1', type: 'system', content: 'AZIZ_OS v2.6.0 (ARM Cortex-M4 / FreeRTOS Target)' },
    { id: '2', type: 'system', content: 'Type "help" or click quick commands below to execute terminal diagnostics.' }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const newLines: TerminalLine[] = [
      ...history,
      { id: Date.now().toString(), type: 'input', content: `$ ${cmdStr}` }
    ];

    switch (trimmed) {
      case 'help':
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `AVAILABLE COMMANDS:
  help       - Display list of CLI commands
  status     - Query live system hardware telemetry & clock frequency
  ecoplugify - Output EcoPlugify FYP research specs & supervision credit
  skills     - Print embedded hardware & software competency matrix
  whoami     - Show developer identity & academic profile
  contact    - Retrieve primary dispatch email & campus address
  clear      - Reset terminal output screen`
        });
        break;

      case 'status':
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `[HARDWARE TELEMETRY REPORT]
  MCU Target      : STM32F429ZIT6 @ 180 MHz
  RTOS Scheduler  : FreeRTOS v10.4.3 (Status: ACTIVE)
  SRAM Usage      : 42.8 KB / 256 KB (16.7%)
  Flash Storage   : 312 KB / 2 MB (15.6%)
  AFE Sampling    : 10,000 Hz Dual-Channel
  Edge AI Inference: Sub-45ms latency (NILM Neural Model)`
        });
        break;

      case 'ecoplugify':
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `[PROJECT: ECOPLUGIFY (FYP)]
  Category   : Smart Energy Metering & Edge AI Anomaly Diagnostics
  Supervisor : Dr. Umer Shoaib (Department of Robotics & AI)
  Institution: University of Gujrat (2025-2026)
  Key Tech   : STM32, ESP32, FreeRTOS, TinyML, MQTT, Isolated AFE
  Precision  : 99.4% metering precision with sub-50ms fault disconnect.`
        });
        break;

      case 'skills':
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `[TECHNICAL MATRIX]
  • Firmware/Microcontrollers : STM32 (92%), ESP32 (95%), C/C++ (94%)
  • Robotics & Control        : ROS 2 (90%), SLAM, PID (89%), LiDAR
  • Hardware & Digital Logic  : PCB Design (88%), Verilog FPGA (82%)
  • Protocols                 : CAN Bus, Modbus, SPI, I2C, UART, MQTT`
        });
        break;

      case 'whoami':
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `Muhammad Aziz Saddique — Systems & AI Hardware Engineer
BS Robotics Engineering Candidate (2022-2026), University of Gujrat.
Focused on bridging physical hardware, autonomous robotics, and edge intelligence.`
        });
        break;

      case 'contact':
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `[CONTACT DISPATCH DETAILS]
  Primary Email : ${PORTFOLIO_DATA.personalInfo.email}
  Location      : ${PORTFOLIO_DATA.personalInfo.location}
  Department    : Department of Robotics & AI, UOG`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: 'error',
          content: `Command not recognized: "${cmdStr}". Type "help" for available commands.`
        });
        break;
    }

    setHistory(newLines);
    setInput('');
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <div className="bg-[#131d25] border border-[#aae02e]/30 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="bg-[#172129] px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          </div>
          <span className="text-[#8f9194] text-[11px] flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-[#aae02e]" />
            <span>aziz_os_terminal.sh</span>
          </span>
        </div>
        <div className="text-[10px] text-[#aae02e] bg-[#0b141c] px-2 py-0.5 rounded border border-[#aae02e]/20">
          BAUD: 115200
        </div>
      </div>

      {/* Quick Command Shortcuts */}
      <div className="px-4 py-2 bg-[#0b141c] border-b border-white/5 flex flex-wrap gap-2 items-center">
        <span className="text-[10px] text-[#8f9194]">PRESETS:</span>
        {['help', 'status', 'ecoplugify', 'skills', 'contact', 'clear'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2.5 py-1 rounded bg-[#172129] hover:bg-[#212b34] text-[#aae02e] border border-white/10 text-[10px] transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Console Output Screen */}
      <div className="p-4 sm:p-6 h-64 sm:h-72 overflow-y-auto space-y-2 bg-[#0b141c]/90">
        {history.map((line) => (
          <div key={line.id} className="leading-relaxed">
            {line.type === 'input' && (
              <span className="text-[#aae02e] font-semibold">{line.content}</span>
            )}
            {line.type === 'system' && (
              <span className="text-[#8f9194]">{line.content}</span>
            )}
            {line.type === 'output' && (
              <pre className="text-[#dae4ef] whitespace-pre-wrap font-mono">{line.content}</pre>
            )}
            {line.type === 'error' && (
              <span className="text-red-400">{line.content}</span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Interactive Command Input Form */}
      <form onSubmit={onSubmit} className="bg-[#172129] px-4 py-3 border-t border-white/10 flex items-center gap-3">
        <span className="text-[#aae02e] font-bold">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type command (e.g. status, ecoplugify)..."
          className="flex-1 bg-transparent text-[#dae4ef] focus:outline-none font-mono text-xs placeholder:text-[#8f9194]"
        />
        <button
          type="submit"
          className="p-1.5 rounded bg-[#aae02e] text-[#0b141c] hover:bg-[#bcf23e] transition-colors"
          title="Execute Command"
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
