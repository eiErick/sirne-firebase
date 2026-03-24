import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Day } from '../../models/calendar.type';
import { MenuWeekViewModel } from '../../models/menu.model';

@Injectable({ providedIn: 'root' })
export class CardapioPdfService {

  private readonly DAY_LABELS: Record<Day, string> = {
    sun: 'DOMINGO',
    mon: 'SEGUNDA-FEIRA',
    tue: 'TERÇA-FEIRA',
    wed: 'QUARTA-FEIRA',
    thu: 'QUINTA-FEIRA',
    fri: 'SEXTA-FEIRA',
    sat: 'SÁBADO',
  };

  private readonly WEEKDAYS: Day[] = ['mon', 'tue', 'wed', 'thu', 'fri'];

  private getWeekLabel(idDate: string): string {
    // idDate = "2025-7-1" → formata como "28/7 À 1/8" se quiser
    // Por ora retorna o idDate; adapte conforme sua lógica de datas
    return idDate;
  }

  generatePdf(weeks: MenuWeekViewModel[], title: string = 'CARDÁPIO MENSAL'): void {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.width;

    // ── TÍTULO GLOBAL ──────────────────────────────────────────────
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(title, pageW / 2, 14, { align: 'center' });

    // ════════════════════════════════════════
    // TABELA 1 — LANCHE
    // Colunas: SEMANA | SEG | TER | QUA | QUI | SEX
    // Cada linha = uma semana, cada célula = lanche daquele dia
    // ════════════════════════════════════════
    doc.setFontSize(11);
    doc.text('LANCHE', 14, 22);

    const snackHead = [
      ['SEMANA', ...this.WEEKDAYS.map(d => this.DAY_LABELS[d])]
    ];

    const snackBody = weeks.map(week => {
      const weekLabel = this.getWeekLabel(week.idDate);
      return [
        weekLabel,
        ...this.WEEKDAYS.map(day => {
          const dayData = week.days.find(d => d.day === day);
          const snacks = dayData?.snacks?.filter(s => s?.name?.trim()) ?? [];
          return snacks.map(s => s.name).join('\n') || '-';
        }),
      ];
    });

    autoTable(doc, {
      startY: 25,
      head: snackHead,
      body: snackBody,
      styles: {
        fontSize: 8,
        cellPadding: 3,
        valign: 'middle',
        halign: 'center',
      },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: 0,
        fontStyle: 'bold',
        halign: 'center',
      },
      columnStyles: {
        0: { cellWidth: 28, fontStyle: 'bold', halign: 'center' },
      },
      theme: 'grid',
    });

    // ════════════════════════════════════════
    // TABELA 2 — ALMOÇO
    // Colunas: SEMANA | SEGUNDA-FEIRA À SEXTA-FEIRA  ← célula única (colspan=5)
    // Cada linha = uma semana, refeição igual todos os dias
    // ════════════════════════════════════════
    const lunchStartY = (doc as any).lastAutoTable.finalY + 10;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('ALMOÇO', 14, lunchStartY);

    const lunchHead = [
      ['SEMANA', ...this.WEEKDAYS.map(d => this.DAY_LABELS[d])]
    ];

    const lunchBody = weeks.map(week => {
      const weekLabel = this.getWeekLabel(week.idDate);
      return [
        weekLabel,
        ...this.WEEKDAYS.map(day => {
          const dayData = week.days.find(d => d.day === day);
          const lunches = dayData?.lunches?.filter(l => l?.name?.trim()) ?? [];
          return lunches.map(l => l.name).join('\n') || '-';
        }),
      ];
    });

    autoTable(doc, {
      startY: lunchStartY + 4,
      head: lunchHead,
      body: lunchBody,
      styles: {
        fontSize: 8,
        cellPadding: 3,
        valign: 'middle',
        halign: 'center',
      },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: 0,
        fontStyle: 'bold',
        halign: 'center',
      },
      columnStyles: {
        0: { cellWidth: 28, fontStyle: 'bold', halign: 'center' },
      },
      theme: 'grid',
    });

    doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
  }
}