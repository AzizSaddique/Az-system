import React from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Radio,
  Sparkles,
  Trophy,
  Zap,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  Globe,
  Wrench,
  Smartphone,
  Server,
  Cpu,
  Bot,
  Award,
  Mail as MailIcon,
  Terminal as TerminalIcon,
  Layers as LayersIcon,
  CheckCircle2,
  Lock,
  Gauge,
  Sliders,
  Send as SendIcon,
  Copy as CopyIcon,
  User,
  ExternalLink,
  CircuitBoard,
  Compass
} from 'lucide-react';

export const ArrowDownward: React.FC<{ className?: string }> = ({ className }) => <ArrowDown className={`w-4 h-4 ${className || ''}`} />;
export const NorthEast: React.FC<{ className?: string }> = ({ className }) => <ArrowUpRight className={`w-4 h-4 ${className || ''}`} />;
export const Code: React.FC<{ className?: string }> = ({ className }) => <Code2 className={`w-4 h-4 ${className || ''}`} />;
export const Sensors: React.FC<{ className?: string }> = ({ className }) => <Radio className={`w-4 h-4 ${className || ''}`} />;
export const Stars: React.FC<{ className?: string }> = ({ className }) => <Sparkles className={`w-4 h-4 ${className || ''}`} />;
export const EmojiEvents: React.FC<{ className?: string }> = ({ className }) => <Trophy className={`w-4 h-4 ${className || ''}`} />;
export const Bolt: React.FC<{ className?: string }> = ({ className }) => <Zap className={`w-4 h-4 ${className || ''}`} />;
export const SyncAlt: React.FC<{ className?: string }> = ({ className }) => <RefreshCw className={`w-4 h-4 ${className || ''}`} />;
export const ShieldWithHeart: React.FC<{ className?: string }> = ({ className }) => <ShieldCheck className={`w-4 h-4 ${className || ''}`} />;
export const ArrowForward: React.FC<{ className?: string }> = ({ className }) => <ArrowRight className={`w-4 h-4 ${className || ''}`} />;
export const Public: React.FC<{ className?: string }> = ({ className }) => <Globe className={`w-4 h-4 ${className || ''}`} />;
export const PrecisionManufacturing: React.FC<{ className?: string }> = ({ className }) => <Wrench className={`w-4 h-4 ${className || ''}`} />;
export const PhoneAndroid: React.FC<{ className?: string }> = ({ className }) => <Smartphone className={`w-4 h-4 ${className || ''}`} />;
export const Dns: React.FC<{ className?: string }> = ({ className }) => <Server className={`w-4 h-4 ${className || ''}`} />;
export const Memory: React.FC<{ className?: string }> = ({ className }) => <Cpu className={`w-4 h-4 ${className || ''}`} />;
export const SmartToy: React.FC<{ className?: string }> = ({ className }) => <Bot className={`w-4 h-4 ${className || ''}`} />;
export const MilitaryTech: React.FC<{ className?: string }> = ({ className }) => <Award className={`w-4 h-4 ${className || ''}`} />;
export const Mail: React.FC<{ className?: string }> = ({ className }) => <MailIcon className={`w-4 h-4 ${className || ''}`} />;
export const Terminal: React.FC<{ className?: string }> = ({ className }) => <TerminalIcon className={`w-4 h-4 ${className || ''}`} />;
export const Layers: React.FC<{ className?: string }> = ({ className }) => <LayersIcon className={`w-4 h-4 ${className || ''}`} />;
export const CheckCircle: React.FC<{ className?: string }> = ({ className }) => <CheckCircle2 className={`w-4 h-4 ${className || ''}`} />;
export const LockIcon: React.FC<{ className?: string }> = ({ className }) => <Lock className={`w-4 h-4 ${className || ''}`} />;
export const Speed: React.FC<{ className?: string }> = ({ className }) => <Gauge className={`w-4 h-4 ${className || ''}`} />;
export const Tune: React.FC<{ className?: string }> = ({ className }) => <Sliders className={`w-4 h-4 ${className || ''}`} />;
export const Send: React.FC<{ className?: string }> = ({ className }) => <SendIcon className={`w-4 h-4 ${className || ''}`} />;
export const ContentCopy: React.FC<{ className?: string }> = ({ className }) => <CopyIcon className={`w-4 h-4 ${className || ''}`} />;
export const Person: React.FC<{ className?: string }> = ({ className }) => <User className={`w-4 h-4 ${className || ''}`} />;
export const OpenInNew: React.FC<{ className?: string }> = ({ className }) => <ExternalLink className={`w-4 h-4 ${className || ''}`} />;
export const DeveloperBoard: React.FC<{ className?: string }> = ({ className }) => <CircuitBoard className={`w-4 h-4 ${className || ''}`} />;
export const Route: React.FC<{ className?: string }> = ({ className }) => <Compass className={`w-4 h-4 ${className || ''}`} />;
