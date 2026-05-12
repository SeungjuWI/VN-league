import { setRequestLocale } from "next-intl/server";
import { PrintButton } from "./print-button";

export default async function CorporateGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="guide-root">
      <style>{`
        .guide-root {
          --g-bg: #FFFFFF;
          --g-surface: #F8F9FA;
          --g-border: #E5E7EB;
          --g-text: #1A1A1A;
          --g-text-secondary: #6B7280;
          --g-accent: #1E3A5F;
          --g-accent-light: #EBF0F7;
          --g-highlight: #D4A853;
          font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: var(--g-bg);
          color: var(--g-text);
          min-height: 100vh;
        }
        @media print {
          body { background: white !important; background-image: none !important; margin: 0 !important; padding: 0 !important; }
          .no-print { display: none !important; }
          .guide-root { min-height: auto; }
          .guide-root header { padding: 32px 0 !important; }
          .guide-main { padding: 24px 0 40px !important; }
          .print-break { break-before: page; }
          @page { margin: 18mm 16mm; size: A4; }
        }
      `}</style>

      {/* Floating actions */}
      <div className="no-print" style={{ position: "fixed", top: 16, right: 16, zIndex: 50, display: "flex", gap: 8 }}>
        <a
          href={`/${locale}`}
          style={{
            padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 500,
            background: "#fff", border: "1px solid #E5E7EB", color: "#374151",
            textDecoration: "none",
          }}
        >
          Back
        </a>
        <PrintButton />
      </div>

      {/* ═══ COVER HEADER ═══ */}
      <header style={{
        background: "linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)",
        color: "#fff", padding: "48px 0",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32, opacity: 0.85, fontSize: 13, letterSpacing: 1 }}>
            <span>LIKELION Vietnam</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>2026 K-Tech College</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
            May Matching Week
          </h1>
          <p style={{ fontSize: 18, fontWeight: 400, opacity: 0.85, marginTop: 8 }}>
            5월 채용매칭위크 &mdash; 기업 안내(안)
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 28, fontSize: 13 }}>
            <InfoPill label="일시" value="2026. 05. 19 (월) — 05. 21 (수)" />
            <InfoPill label="장소" value="COBI Work 4F, 7군, 호치민시" />
            <InfoPill label="문의" value="likelion.vn@likelion.net" />
          </div>
        </div>
      </header>

      <main className="guide-main" style={{ maxWidth: 800, margin: "0 auto", padding: "40px 32px 60px" }}>

        {/* ═══ 1. 행사 개요 ═══ */}
        <Section number={1} title="행사 개요">
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#374151", marginBottom: 20 }}>
            본 행사는 <strong>2026 K-Tech College 해외인력 취업매칭 지원사업</strong>의 일환으로 진행되며,
            사전 매칭 기업에 한하여 참여가 가능합니다. 사전 매칭된 1:1 인터뷰는 별도 공유드린 일정에 따라 진행되오니, 참고하여 주시기 바랍니다.
          </p>

          <div style={{ display: "grid", gap: 12 }}>
            <GuideItem title="권장 도착 시간">
              <BulletList items={["오전 세션: 08:30 이전 도착을 부탁드립니다.", "오후 세션: 13:30 이전 도착을 부탁드립니다."]} />
            </GuideItem>
            <GuideItem title="등록 절차">
              <p style={{ ...itemText, marginBottom: 8 }}>도착 시 아래 순서에 따라 등록을 진행해 주시기 바랍니다.</p>
              <StepFlow steps={["등록 데스크 방문", "명찰 수령", "면접 테이블 및 일정 확인", "현장 지원 정보 확인"]} />
            </GuideItem>
            <GuideItem title="면접 운영">
              <p style={itemText}>면접은 30~40분 진행 / 5분 휴식을 권장드리고 있습니다. 원활한 행사 운영을 위해 배정된 시간을 준수하여 주시면 감사하겠습니다.</p>
            </GuideItem>
            <GuideItem title="기업 설명회">
              <p style={itemText}>기업 설명회에서는 베트남 인재 풀 소개, 채용 문화 및 근무 환경, 계약 구조 등을 안내해 드리는 자리입니다. 행사 참여 당일 타임테이블을 확인하신 후 해당 시간에 참석하여 주시기 바랍니다.</p>
            </GuideItem>
            <GuideItem title="현장 즉석 면접">
              <p style={itemText}>사전 매칭이 이루어지지 않은 지원자의 경우에도 현장에서 즉석 인터뷰 신청이 가능합니다. 현장 등록 데스크에서 신청 접수 후, 기업 담당자님의 확인을 거쳐 진행됩니다. 기업 일정에 따라 가능 여부가 달라질 수 있는 점 양해 부탁드립니다.</p>
            </GuideItem>
            <GuideItem title="최종 매칭 회신">
              <p style={itemText}>1:1 인터뷰 진행 후 최종 매칭 희망 회신은 <strong>인터뷰 종료일로부터 최대 3일 이내</strong>에 <strong>likelion.vn@likelion.net</strong>으로 전달하여 주시면 감사하겠습니다.</p>
            </GuideItem>
            <GuideItem title="현장 문의">
              <p style={itemText}>방문 기업을 대상으로 안내를 위한 카카오톡 오픈채팅방을 개설하여 초대드릴 예정입니다.<br />행사 관련 문의 사항은 오픈채팅방을 통해 연락 부탁드립니다.</p>
            </GuideItem>
          </div>
        </Section>

        {/* ═══ 2. 프로그램 일정 ═══ */}
        <Section number={2} title="프로그램 일정">

          <DayBlock
            label="1일차"
            date="5/19 (월)"
            theme="1:1 Interview"
            accent="#1E3A5F"
          />
          <ClassicTable
            headers={["시간", "메인 공간 (4F 컨퍼런스 룸)", "서브 공간 (4F 미팅 룸)"]}
            rows={[
              ["08:30 – 09:00", "등록 및 참석자 응대 / 체크인", ""],
              ["09:00 – 10:00", "1:1 채용 매칭 인터뷰 (오전)", "기업설명회 (LIKELION)"],
              ["10:00 – 11:00", "1:1 채용 매칭 인터뷰 (오전)", "멘토링 1세션 (Worxphere)"],
              ["11:00 – 12:00", "1:1 채용 매칭 인터뷰 (오전)", "멘토링 2세션 (Worxphere)"],
              ["12:00 – 13:00", "점심 시간", ""],
              ["13:00 – 14:00", "1:1 채용 매칭 인터뷰 (오후)", "기업설명회 (LIKELION)"],
              ["14:00 – 15:00", "1:1 채용 매칭 인터뷰 (오후)", "멘토링 3세션 (Worxphere)"],
              ["15:00 – 16:00", "1:1 채용 매칭 인터뷰 (오후)", ""],
              ["16:00 – 17:00", "1일차 종료", ""],
            ]}
          />

          <DayBlock
            label="2일차"
            date="5/20 (화)"
            theme="IDEA-THON"
            sub="KTC AI Challenge — 미래의 일자리를 위한 스마트 솔루션 구축"
            accent="#8B6914"
          />
          <ClassicTable
            headers={["시간", "메인 공간 (4F 컨퍼런스 룸)", "서브 공간 (4F 미팅 룸)", "커피챗 (3F 라운지)"]}
            rows={[
              ["08:30 – 09:00", "아이디어톤 참석자 확인", "", ""],
              ["09:00 – 10:00", "아이디어톤", "기업설명회 (LIKELION)", "커피챗"],
              ["10:00 – 11:00", "아이디어톤", "멘토링 1세션 (Worxphere)", "커피챗"],
              ["11:00 – 12:00", "아이디어톤", "멘토링 2세션 (Worxphere)", "커피챗"],
              ["12:00 – 13:00", "점심 시간", "", ""],
              ["13:00 – 14:00", "아이디어톤", "기업설명회 (LIKELION)", "커피챗"],
              ["14:00 – 15:00", "아이디어톤", "멘토링 3세션 (Worxphere)", "커피챗"],
              ["15:00 – 16:00", "아이디어톤", "", "커피챗"],
              ["16:00 – 17:00", "2일차 종료", "", ""],
            ]}
          />

          <div className="print-break" />

          <DayBlock
            label="3일차"
            date="5/21 (수)"
            theme="Deep Interview"
            accent="#4A5568"
          />
          <ClassicTable
            headers={["시간", "메인 공간 (4F 컨퍼런스 룸)", "서브 공간 (4F 미팅 룸)"]}
            rows={[
              ["09:00 – 10:00", "기업설명회 (LIKELION)", "커피챗"],
              ["10:00 – 11:00", "멘토링 1세션 (Worxphere)", "커피챗"],
              ["11:00 – 12:00", "멘토링 2세션 (Worxphere)", "커피챗"],
              ["12:00 – 13:00", "점심 시간", ""],
              ["13:00 – 14:00", "기업설명회 (LIKELION)", "커피챗"],
              ["14:00 – 15:00", "멘토링 3세션 (Worxphere)", "커피챗"],
              ["15:00 – 16:00", "", "커피챗"],
              ["16:00 – 17:00", "3일차 종료", ""],
            ]}
          />
        </Section>

        {/* ═══ 3. 기업 준비사항 ═══ */}
        <Section number={3} title="기업 준비사항">
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#374151", marginBottom: 16 }}>
            원활한 행사 진행을 위해 아래 사항을 사전에 준비하여 주시면 감사하겠습니다.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "#F8F9FA", border: "1px solid #E5E7EB", borderRadius: 8, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ width: 24, height: 24, borderRadius: 4, background: "#1E3A5F", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>!</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#1E3A5F" }}>필수 준비물</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                {["채용 자료 (JD)", "회사 소개서", "지원자 평가표", "개인 노트북 / 충전기"].map((item) => (
                  <li key={item} style={{ fontSize: 13, lineHeight: 2, color: "#374151", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#1E3A5F", fontWeight: 700 }}>&#10003;</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "#FFFBF0", border: "1px solid #F3E8C8", borderRadius: 8, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ width: 24, height: 24, borderRadius: 4, background: "#D4A853", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>+</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#8B6914" }}>선택 (권장)</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                {["롤업 배너", "홍보 브로슈어", "면접 기념품 / 굿즈"].map((item) => (
                  <li key={item} style={{ fontSize: 13, lineHeight: 2, color: "#6B7280", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#D4A853" }}>&#9675;</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ═══ 4. 현장 즉석 면접 ═══ */}
        <Section number={4} title="현장 즉석 면접 안내">
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#374151", marginBottom: 16 }}>
            사전 1:1 인터뷰 매칭이 이루어지지 않은 지원자의 경우에도, 현장에서 참여 기업과의 인터뷰를 신청하실 수 있습니다. 아래 절차에 따라 진행되오니 참고하여 주시기 바랍니다.
          </p>
          <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
            {["현장 등록 데스크에서\n즉석 인터뷰 신청", "기업 담당자\n확인", "기업 일정에 따라\n면접 진행"].map((step, i) => (
              <div key={i} style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <div style={{ textAlign: "center", flex: 1, padding: "16px 12px", background: "#F8F9FA", border: "1px solid #E5E7EB", borderRadius: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1E3A5F", color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: 12, color: "#374151", margin: 0, whiteSpace: "pre-line", lineHeight: 1.5 }}>{step}</p>
                </div>
                {i < 2 && <span style={{ fontSize: 18, color: "#D1D5DB", padding: "0 4px", flexShrink: 0 }}>&rarr;</span>}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 12, fontStyle: "italic" }}>
            * 기업 일정 및 여건에 따라 즉석 면접 가능 여부가 달라질 수 있으며, 현장 운영팀에 문의하여 주시기 바랍니다.
          </p>
        </Section>

        {/* ═══ 5. 기타 및 지원 ═══ */}
        <Section number={5} title="기타 및 지원 안내">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div style={{ background: "#F8F9FA", border: "1px solid #E5E7EB", borderRadius: 8, padding: 20 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1E3A5F", margin: "0 0 8px" }}>통역 지원</h4>
              <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.7 }}>
                전 일정에 걸쳐 한국어-베트남어 전문 통역사가 구역별로 배치되어 있사오니, 필요하신 경우 편하게 요청하여 주시기 바랍니다.
              </p>
            </div>
            <div style={{ background: "#F8F9FA", border: "1px solid #E5E7EB", borderRadius: 8, padding: 20 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1E3A5F", margin: "0 0 8px" }}>현장 문의</h4>
              <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.7 }}>
                방문 기업을 대상으로 안내를 위한 카카오톡 오픈채팅방에 초대드릴 예정입니다.<br />
                행사 관련 문의 사항은 오픈채팅방을 통해 말씀해 주시기 바랍니다.
              </p>
            </div>
          </div>

          <div style={{ background: "#F8F9FA", border: "1px solid #E5E7EB", borderRadius: 8, padding: 20 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1E3A5F", margin: "0 0 4px" }}>행사장 도착 후 응대</h4>
            <p style={{ fontSize: 12, color: "#6B7280", margin: "0 0 12px", lineHeight: 1.6 }}>행사장 도착 시 아래 담당자가 안내해 드릴 예정입니다. 도움이 필요하신 경우 편하게 연락하여 주시기 바랍니다.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { name: "이정아 매니저", team: "웍스피어 커리어사업팀", email: "leeja2623@worxphere.ai", phone: "010-7711-5861" },
                { name: "김민진 매니저", team: "웍스피어 커리어사업팀", email: "minjin4@worxphere.ai", phone: "010-3151-5376" },
              ].map((p) => (
                <div key={p.name} style={{ padding: "12px 14px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 6 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A", margin: "0 0 2px" }}>{p.name}</p>
                  <p style={{ fontSize: 12, color: "#6B7280", margin: "0 0 8px" }}>{p.team}</p>
                  <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.8 }}>
                    <a href={`mailto:${p.email}`} style={{ color: "#1E3A5F", textDecoration: "none" }}>{p.email}</a><br />
                    <a href={`tel:${p.phone}`} style={{ color: "#1E3A5F", textDecoration: "none" }}>{p.phone}</a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ═══ 6. 행사 장소 ═══ */}
        <Section number={6} title="행사 장소">
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#374151", marginBottom: 16 }}>
            행사는 아래 장소에서 진행됩니다. 방문 시 참고하여 주시기 바랍니다.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1A1A1A", margin: "0 0 12px" }}>
                COBI Work &mdash; Convention Room 4F
              </h3>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: "0 0 16px" }}>
                Cobi Tower II, 2-4 Duong so 8, Tan My,<br />
                Quan 7, Ho Chi Minh City, Vietnam
              </p>

              <div style={{ display: "grid", gap: 8 }}>
                {[
                  { area: "Convention Room 4F", purpose: "메인 이벤트 / 1:1 인터뷰" },
                  { area: "Meeting Room 4F", purpose: "멘토링 세션 / 기업설명회" },
                  { area: "Coffee Lounge 3F", purpose: "커피챗 / 네트워킹" },
                ].map((a) => (
                  <div key={a.area} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "#F8F9FA", borderRadius: 6, border: "1px solid #E5E7EB" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1E3A5F", flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>{a.area}</span>
                      <span style={{ fontSize: 12, color: "#6B7280", marginLeft: 8 }}>{a.purpose}</span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://maps.app.goo.gl/YQuNrauPg6fKsqqt5"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block", marginTop: 16, fontSize: 13, fontWeight: 600,
                  color: "#1E3A5F", textDecoration: "none", borderBottom: "1px solid #1E3A5F",
                  paddingBottom: 1,
                }}
              >
                Google Maps에서 보기 &rarr;
              </a>
            </div>

            <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #E5E7EB", minHeight: 280 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0!2d106.7!3d10.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQzJzQ4LjAiTiAxMDbCsDQyJzAwLjAiRQ!5e0!3m2!1svi!2s!4v1"
                style={{ width: "100%", height: "100%", minHeight: 280, border: 0 }}
                allowFullScreen
                loading="lazy"
                title="COBI Work - Convention Room 4F"
              />
            </div>
          </div>
        </Section>

        {/* ═══ FOOTER ═══ */}
        <footer style={{ marginTop: 48, paddingTop: 24, borderTop: "2px solid #1E3A5F" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#1E3A5F", margin: 0 }}>LIKELION Vietnam</p>
              <p style={{ fontSize: 12, color: "#6B7280", margin: "4px 0 0" }}>likelion.vn@likelion.net</p>
            </div>
            <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0 }}>
              2026 K-Tech College &middot; May Matching Week &middot; Corporate Guide
            </p>
          </div>
        </footer>

      </main>
    </div>
  );
}

/* ─── Style constants ─── */

const itemText: React.CSSProperties = {
  fontSize: 13, lineHeight: 1.7, color: "#374151", margin: 0,
};

/* ─── Sub-components ─── */

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, opacity: 0.6 }}>{label}</span>
      <span style={{ fontSize: 13 }}>{value}</span>
    </div>
  );
}

function Section({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid #E5E7EB" }}>
        <span style={{
          width: 28, height: 28, borderRadius: "50%", background: "#1E3A5F", color: "#fff",
          fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {number}
        </span>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A", margin: 0 }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function GuideItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "14px 18px", background: "#F8F9FA", borderRadius: 8, borderLeft: "3px solid #1E3A5F" }}>
      <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1E3A5F", margin: "0 0 6px" }}>{title}</h4>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 16, listStyleType: "disc" }}>
      {items.map((item) => (
        <li key={item} style={{ fontSize: 13, lineHeight: 1.8, color: "#374151" }}>{item}</li>
      ))}
    </ul>
  );
}

function StepFlow({ steps }: { steps: string[] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
      {steps.map((step, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#374151", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 4, padding: "2px 10px" }}>
            {step}
          </span>
          {i < steps.length - 1 && <span style={{ margin: "0 6px", color: "#D1D5DB" }}>&rarr;</span>}
        </span>
      ))}
    </div>
  );
}

function DayBlock({ label, date, theme, sub, accent }: { label: string; date: string; theme: string; sub?: string; accent: string }) {
  return (
    <div style={{ marginTop: 28, marginBottom: 14, display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: accent, borderRadius: 4, padding: "3px 10px" }}>
        {label}
      </span>
      <span style={{ fontSize: 13, color: "#6B7280" }}>{date}</span>
      <span style={{ fontSize: 16, fontWeight: 700, color: "#1A1A1A" }}>{theme}</span>
      {sub && <span style={{ flexBasis: "100%", fontSize: 12, color: "#6B7280", marginTop: 2 }}>{sub}</span>}
    </div>
  );
}

function ClassicTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: 20 }}>
      <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} style={{
                textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6B7280",
                textTransform: "uppercase", letterSpacing: 0.5,
                borderBottom: "2px solid #1E3A5F", padding: "8px 12px",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#FAFBFC" : "#fff" }}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: "8px 12px", borderBottom: "1px solid #F3F4F6",
                  color: j === 0 ? "#1E3A5F" : cell ? "#374151" : "#D1D5DB",
                  fontWeight: j === 0 ? 600 : 400,
                  whiteSpace: j === 0 ? "nowrap" : undefined,
                  fontSize: j === 0 ? 12 : 13,
                }}>
                  {cell || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
