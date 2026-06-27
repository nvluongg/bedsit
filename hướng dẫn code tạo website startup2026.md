# Web Phòng Trọ Chatbot + RAG

## Tổng quan

Nền tảng web phòng trọ kèm chatbot AI được thiết kế để tư vấn tìm phòng, giải thích quy trình thuê, hỗ trợ chủ trọ đăng tin và trả lời câu hỏi dựa trên kho tri thức nội bộ (RAG).

## Lý do & vấn đề giải quyết

Hiện có nhiều kênh tìm trọ rải rác và nhiều hệ thống dẫn đi xem phòng, nhưng chưa đơn vị nào giải quyết triệt để **chất lượng** và **quyền lợi** của người đi thuê. Nền tảng này tạo khác biệt rõ ở hai khía cạnh: chất lượng và quyền lợi.

## Khác biệt về CHẤT LƯỢNG

- Không chỉ dẫn đường qua bản đồ và cho biết phòng nào còn/hết, mà còn cho biết phòng đó **ở có ổn không, dịch vụ thế nào** qua hệ thống **comment/feedback** của người từng ở.
- **Thưởng tiền** khi người dùng feedback và giới thiệu app cho người khác (khoảng 200–300k, chuyển khoản ngay).
- AI giúp tìm và kết nối trực tiếp tới nơi thuê qua **bản đồ**; **hợp đồng và lịch sử giao dịch** được lưu vết trong hệ thống thay cho giấy tờ → minh bạch, tránh tranh chấp hoặc huỷ hợp đồng sai thoả thuận, bảo vệ quyền lợi cả hai bên.
- Feedback có **ràng buộc pháp lý**: thông tin sai sự thật phải chịu trách nhiệm trước pháp luật → tăng độ uy tín.
- Tổng thể mang lại: uy tín, tiện lợi, rõ ràng, minh bạch, an toàn, nhanh chóng.

## Khác biệt về QUYỀN LỢI

- App khác chỉ dẫn đường và bắt chờ đợi; nếu nhân viên sale bận hoặc ốm thì việc tư vấn và xem phòng bị trì hoãn.
- Nền tảng này mang lại **giá trị thực tế**: tiền sau khi thuê được **hoàn lại** hoặc quy thành **voucher giảm giá** — bù đắp công sức người đi xem phòng.
- Voucher giúp **giảm gánh nặng tài chính** sau khi thuê, hoàn toàn miễn phí, không thu thêm phí.
- Phù hợp tâm lý **không thích qua môi giới** của nhiều người → giải quyết đúng nỗi đau thị trường mà các app khác chưa có.

## Vai trò của AI

AI lưu trữ và trò chuyện với khách dựa trên dữ liệu do chủ trọ cập nhật qua giao diện đăng tin cùng các điều khoản cam kết. AI có thể:

- Trả lời câu hỏi về dịch vụ, vị trí phòng, đường đi, giá cả — dựa trên dữ liệu được nạp vào và xử lý qua nhiều lớp để trả về kết quả sát nhất.
- Kèm **thông tin liên hệ** và **số tiền/voucher** nhận được sau khi thuê.
- Cho biết **địa chỉ phòng, khoảng cách tới vị trí của bạn (bao nhiêu mét)** và **các phòng lân cận khác** trong khu vực, kèm **gợi ý so sánh giá** xung quanh.
- Tra cứu **pháp lý** và hướng dẫn **cách bình luận/feedback đúng quy định để được nhận tiền lại**.
- Kho tri thức được đội ngũ **nạp dữ liệu và train** thường xuyên.

## Thiết kế UI & trải nghiệm

- Giao diện tiếp cận dựa trên **tâm lý học nhận diện**, vừa **thân thiện** vừa **chuyên nghiệp**, hướng tới hai nhóm khách: **bình dân** và **tầng lớp cao hơn**, giúp mỗi người cảm nhận được "vị thế" của mình khi dùng app.
- Thu hút bước đầu bằng **sự tò mò sâu sắc**: khơi gợi câu hỏi "tại sao lại được giúp đỡ và nhận tiền?", khiến người dùng muốn khám phá, tìm hiểu rồi sử dụng và nhận lại tiền.
- Đánh đúng tâm lý nhiều người **không thích bị qua tay môi giới** → loại bỏ khâu trung gian gây khó chịu.
- Sau khi đăng nhập, trang chủ hiển thị liên kết với **ngân hàng/doanh nghiệp** và các khối chức năng dễ đọc – dễ hiểu – dễ thao tác:
- Tìm kiếm phòng (searching).
- Voucher (kèm hướng dẫn giới thiệu để nhận tiền).
- Hỏi AI để được hướng dẫn và tra cứu thông tin phòng nhanh.
- Đặt lịch xem phòng trước.
- Lịch sử hợp đồng đã ký và tiền đã nhận.
- Các phòng lân cận để tham khảo thêm.

### 3 loại giao diện theo vai trò

Hệ thống có 3 loại UI tương ứng 3 vai trò, mỗi loại chỉ hiển thị chức năng phù hợp:

| **Loại UI** | **Vai trò** | **Chức năng chính** |
| --- | --- | --- |
| **UI User** | Người thuê | Tìm/lọc phòng, hỏi AI, đặt lịch xem, voucher & giới thiệu, lịch sử hợp đồng/tiền nhận, xem phòng lân cận |
| **UI Owner** | Chủ trọ | Đăng/sửa tin phòng, quản lý lịch hẹn, xem feedback, quản lý hợp đồng |
| **UI Manager** | Quản trị / Admin | Duyệt tin, kiểm soát feedback & rủi ro, quản lý voucher/hoàn tiền, giám sát hệ thống |

Những **kỹ thuật / framework / công nghệ sử dụng** cho website phòng trọ là:

## **1. Frontend**

| **Công nghệ** | **Dùng để làm gì** |
| --- | --- |
| **Next.js** | Framework xây dựng giao diện web, routing, render trang |
| **React** | Xây dựng component giao diện |
| **TypeScript** | Viết code an toàn hơn, có kiểu dữ liệu rõ ràng |
| **Tailwind CSS** | Thiết kế giao diện nhanh, responsive, hiện đại |
| **React Hook Form** | Xử lý form đăng nhập, đăng ký, đăng tin phòng |
| **Zod** | Kiểm tra dữ liệu nhập từ form |
| **Fetch API / Axios** | Gọi API từ frontend sang backend |

## **2. Backend**

| **Công nghệ** | **Dùng để làm gì** |
| --- | --- |
| **Spring Boot** | Framework xây dựng backend REST API |
| **Java** | Ngôn ngữ lập trình backend |
| **Spring Security** | Bảo mật, xác thực, phân quyền |
| **JWT** | Đăng nhập bằng token |
| **Spring Data JPA** | Làm việc với database thông qua entity/repository |
| **Hibernate** | ORM ánh xạ object Java với bảng database |
| **Jakarta Bean Validation** | Validate dữ liệu request |
| **Maven** | Quản lý thư viện và build backend |
| **Swagger / OpenAPI** | Tạo tài liệu API |

## **3. Database**

| **Công nghệ** | **Dùng để làm gì** |
| --- | --- |
| **PostgreSQL** | Database chính lưu user, phòng trọ, lịch hẹn, tin nhắn |
| **Flyway / Liquibase** | Quản lý migration database |
| **Redis** | Cache, rate limit, session tạm thời nếu cần |

## **4. Lưu trữ ảnh**

| **Công nghệ** | **Dùng để làm gì** |
| --- | --- |
| **Cloudinary** | Upload và tối ưu ảnh phòng trọ |
| **AWS S3 / Supabase Storage** | Lưu trữ ảnh khi triển khai production |

## **5. Chat người thuê - chủ trọ**

| **Công nghệ** | **Dùng để làm gì** |
| --- | --- |
| **REST API** | Chat MVP, gửi/lấy tin nhắn |
| **WebSocket** | Chat realtime ở bản nâng cấp |
| **STOMP WebSocket** | Tích hợp realtime tốt với Spring Boot |
| **Redis Pub/Sub** | Mở rộng chat realtime khi nhiều server |

## **6. Chatbot AI / RAG**

| **Công nghệ** | **Dùng để làm gì** |
| --- | --- |
| **OpenAI API** | Sinh câu trả lời tự nhiên bằng tiếng Việt |
| **Rule-based fallback** | Trả lời cơ bản nếu chưa có API key |
| **Markdown Knowledge Base** | Lưu tài liệu nội bộ cho chatbot |
| **RAG** | Truy xuất tài liệu liên quan trước khi trả lời |
| **Embeddings** | Biến văn bản thành vector để tìm kiếm ngữ nghĩa |
| **pgvector / Chroma / Qdrant** | Lưu và tìm kiếm vector embeddings |

## **7. DevOps / Deploy**

| **Công nghệ** | **Dùng để làm gì** |
| --- | --- |
| **Docker** | Đóng gói ứng dụng |
| **Docker Compose** | Chạy frontend, backend, database local |
| **Nginx** | Reverse proxy khi deploy |
| **GitHub Actions** | CI/CD tự động build/test/deploy |
| **Vercel** | Deploy frontend Next.js |
| **Render / Railway / VPS** | Deploy backend Spring Boot |
| **Supabase / Neon / Railway PostgreSQL** | Database cloud |

## **8. Testing**

| **Công nghệ** | **Dùng để làm gì** |
| --- | --- |
| **JUnit 5** | Unit test backend |
| **Spring Boot Test / MockMvc** | Test REST API |
| **ESLint** | Kiểm tra lỗi code frontend |
| **React Testing Library** | Test component React |
| **Playwright** | Test end-to-end toàn bộ luồng người dùng |
| **Postman / Bruno** | Test API thủ công |

## **9. Kỹ thuật chính sử dụng**

| **Kỹ thuật** | **Ý nghĩa** |
| --- | --- |
| **RESTful API** | Frontend giao tiếp backend qua API |
| **JWT Authentication** | Xác thực người dùng bằng token |
| **RBAC** | Phân quyền theo vai trò: tenant, landlord, admin |
| **Server-side validation** | Kiểm tra dữ liệu ở backend |
| **Client-side validation** | Kiểm tra dữ liệu ở frontend |
| **ORM** | Ánh xạ bảng database với object code |
| **Responsive Design** | Giao diện tương thích mobile/tablet/desktop |
| **RAG** | Chatbot trả lời dựa trên tài liệu nội bộ |
| **Fallback local** | Chatbot vẫn chạy khi chưa có API key |
| **Caching** | Tăng tốc truy vấn dữ liệu |
| **Migration** | Quản lý thay đổi database |
| **CI/CD** | Tự động build, test, deploy |

## Kiến trúc hệ thống

Hệ thống gồm 4 lớp chính:

- **Frontend (Next.js)**: giao diện người dùng, gọi REST API qua HTTPS.
- **Backend (Spring Boot)**: REST API, xác thực JWT, phân quyền RBAC, nghiệp vụ phòng trọ/booking/chat.
- **Dữ liệu**: PostgreSQL (dữ liệu chính), Redis (cache), pgvector (vector embeddings cho RAG), Cloudinary/S3 (ảnh).
- **Chatbot AI / RAG service**: nhận câu hỏi, truy xuất tài liệu liên quan từ vector store, gọi LLM (OpenAI) để sinh câu trả lời; fallback rule-based khi chưa có API key.

```
[Người dùng] → [Next.js Frontend] → [Spring Boot REST API] → [PostgreSQL / Redis / Cloudinary]
                                          │
                                          ▼
                                   [RAG Service] → [Vector DB (pgvector)] + [LLM (OpenAI)]
```

## Mô hình dữ liệu chính

| Bảng | Vai trò |
| --- | --- |
| **users** | Tài khoản, vai trò (tenant/landlord/admin) |
| **rooms** | Thông tin phòng: giá, diện tích, địa chỉ, tiện ích, trạng thái |
| **room_images** | Ảnh phòng (liên kết Cloudinary/S3) |
| **bookings** | Lịch hẹn xem phòng |
| **conversations / messages** | Chat giữa người thuê và chủ trọ |
| **knowledge_documents / embeddings** | Tài liệu RAG và vector phục vụ tìm kiếm ngữ nghĩa |
| **feedbacks / comments** | Đánh giá phòng từ người từng ở, có ràng buộc pháp lý |
| **contracts** | Hợp đồng & lịch sử giao dịch lưu vết minh bạch |
| **vouchers** | Hoàn tiền / voucher cho người thuê sau khi thuê |
| **referrals** | Thưởng tiền khi giới thiệu app cho người khác |

## Luồng xử lý RAG

1. Người dùng đặt câu hỏi kèm context (vai trò, ngân sách, phòng đang xem...).
2. Hệ thống tạo embedding cho câu hỏi và truy vấn vector store để tìm tài liệu liên quan.
3. Ghép tài liệu truy xuất + context vào prompt gửi LLM.
4. LLM sinh câu trả lời tiếng Việt; nếu không có API key thì dùng fallback rule/keyword.
5. Áp dụng guardrail trước khi trả kết quả cho người dùng.

## RAG xử lý tri thức như thế nào

RAG xử lý tri thức qua **2 luồng tách biệt**: luồng **nạp dữ liệu (ingestion)** chạy offline để chuẩn bị tri thức, và luồng **truy vấn (retrieval)** chạy real-time mỗi khi khách hỏi chatbot.

### Luồng 1 — NẠP tri thức (Ingestion, chạy khi cập nhật)

Biến các file trong `knowledge_base/` và dữ liệu từ DB thành thứ AI tra cứu được.

```
File .md / dữ liệu phòng → Chunking → Embedding → Lưu vào pgvector
```

- **Thu thập (Load):** đọc file tĩnh trong `knowledge_base/` (chính sách thuê, hướng dẫn feedback nhận tiền, quy định pháp lý, FAQ voucher...) và dữ liệu động từ PostgreSQL (thông tin phòng, giá, địa chỉ, tình trạng còn/hết).
- **Cắt nhỏ (Chunking):** mỗi tài liệu dài bị cắt thành các đoạn ~300–800 token. Đoạn quá to → nhiễu; quá nhỏ → mất ngữ cảnh.
- **Tạo embedding (Vector hóa):** mỗi chunk đưa qua model embedding (OpenAI) → trả ra một **vector** (~1536 chiều) đại diện cho *ý nghĩa* đoạn đó. Đoạn nghĩa giống nhau → vector gần nhau.
- **Lưu trữ:** vector + nội dung gốc + metadata (nguồn, loại tài liệu, room_id...) được lưu vào bảng `embeddings` trong **PostgreSQL + pgvector**.

### Luồng 2 — TRUY VẤN (Retrieval, chạy real-time khi khách hỏi)

```
Câu hỏi → Embedding → Tìm vector gần nhất → Ghép ngữ cảnh → LLM trả lời
```

- **Vector hóa câu hỏi:** câu hỏi của khách cũng được embedding thành 1 vector bằng *cùng model* ở trên.
- **Tìm kiếm tương đồng (Semantic Search):** pgvector so sánh vector câu hỏi với toàn bộ vector trong kho, lấy ra **top-K đoạn gần nhất** (ví dụ 5 đoạn liên quan nhất) bằng cosine similarity.
- **Ghép ngữ cảnh (Augment):** các đoạn lấy được + câu hỏi gốc được nhồi vào một **prompt** mẫu: "Dựa trên các thông tin sau: [5 đoạn tri thức]... Hãy trả lời câu hỏi: [câu hỏi khách]."
- **Sinh câu trả lời (Generate):** LLM đọc prompt đó và trả lời **dựa trên dữ liệu thật** — kèm thông tin liên hệ, số tiền voucher, địa chỉ/khoảng cách, phòng lân cận.

### Vì sao phải dùng RAG thay vì hỏi thẳng LLM

| **Vấn đề nếu hỏi thẳng LLM** | **RAG giải quyết** |
| --- | --- |
| AI "bịa" (hallucination) | Chỉ trả lời từ tri thức đã nạp |
| Không biết dữ liệu phòng của bạn | Nạp DB phòng + chính sách riêng |
| Dữ liệu cũ, không cập nhật | Chỉ cần thêm file / re-ingest |
| Không truy nguồn được | Mỗi câu trả lời gắn metadata nguồn |

<aside>
💡

Tóm tắt 1 câu: RAG = cắt nhỏ tri thức → biến thành vector → khi khách hỏi thì tìm đoạn gần nghĩa nhất → đưa cho AI làm "tài liệu tham khảo" để trả lời chính xác thay vì bịa.

</aside>

## Chức năng

- Chat bằng tiếng Việt, giọng thân thiện, rõ ràng, ngắn gọn.
- Có RAG từ folder `knowledge_base/` hoặc kho tài liệu nội bộ của hệ thống.
- Dùng OpenAI hoặc LLM provider nếu có API key.
- Nếu chưa có API key, fallback local bằng rule/keyword đơn giản.
- Hỗ trợ người thuê:
- Tư vấn khu vực, mức giá, diện tích, tiện ích.
- Giải thích quy trình đặt lịch xem phòng.
- Hướng dẫn kiểm tra thông tin phòng trước khi thuê.
- Trả lời câu hỏi về cọc, hợp đồng, chi phí điện nước, internet, gửi xe.
- Hỗ trợ chủ trọ:
- Hướng dẫn đăng tin phòng.
- Gợi ý cách viết mô tả phòng rõ ràng.
- Nhắc các trường thông tin bắt buộc: giá, diện tích, địa chỉ, tiện ích, ảnh, quy định.
- Giải thích trạng thái duyệt tin.
- Hỗ trợ admin:
- Tóm tắt tiêu chí duyệt tin.
- Gợi ý checklist phát hiện tin thiếu thông tin hoặc có rủi ro.

## Guardrail

- Không cam kết phòng chắc chắn còn trống nếu chưa kiểm tra dữ liệu backend.
- Không tự ý xác nhận đặt lịch, thanh toán, hoàn tiền hoặc duyệt tin nếu không gọi API thật.
- Không đưa lời khuyên pháp lý như luật sư; chỉ cung cấp thông tin tham khảo và khuyên người dùng kiểm tra hợp đồng/kênh hỗ trợ chính thức.
- Không yêu cầu người dùng gửi giấy tờ nhạy cảm qua chat nếu chưa có luồng upload bảo mật.
- Không tiết lộ số điện thoại/email riêng tư của người dùng khác nếu không đúng quyền truy cập.
- Không bịa dữ liệu phòng; nếu thiếu thông tin phải nói rõ là chưa có dữ liệu.

## Chạy thử MVP

```bash

python chatbot_cli.py

```

Nếu PowerShell bị lỗi font/encoding khi in tiếng Việt, chạy trước:

```powershell

$env:PYTHONIOENCODING="utf-8"

chcp 65001

python chatbot_cli.py

```

**Giải thích các lệnh trên:**

- `python chatbot_cli.py`: chạy file Python `chatbot_cli.py` — đây là giao diện chat trong terminal (CLI), dùng để test nhanh chatbot mà chưa cần web. Nó gọi vào logic RAG (`retriever`, `llm`...) để kiểm tra bot trả lời đúng chưa.
- Khối PowerShell chỉ cần khi chạy trên **Windows** và tiếng Việt bị vỡ font (ví dụ `Tôi muốn` thành ký tự lạ), do terminal mặc định không dùng UTF-8.

| **Lệnh** | **Tác dụng** |
| --- | --- |
| `$env:PYTHONIOENCODING="utf-8"` | Bắt Python in/đọc bằng mã UTF-8 (mã chuẩn cho tiếng Việt) |
| `chcp 65001` | Đổi code page của terminal Windows sang UTF-8 (65001 = mã UTF-8) |
| `python chatbot_cli.py` | Sau khi sửa mã xong thì chạy lại bot như bình thường |

<aside>
💡

Trên macOS/Linux thường KHÔNG cần 2 lệnh `$env:...` và `chcp` vì terminal đã mặc định UTF-8 — chỉ cần `python chatbot_cli.py`. Đây là cách chạy ở Giai đoạn 1 (MVP) phục vụ lập trình viên test; khi đã ghép vào web, người dùng cuối chat qua giao diện chứ không gõ lệnh này.

</aside>

**Tùy chọn — gói các lệnh vào 1 file script** để khỏi gõ lại nhiều dòng mỗi lần chạy. Các lệnh `python ...`, `chcp`, `$env:...` bản thân chỉ là lệnh gõ ở terminal (không bắt buộc lưu thành file); nhưng nếu muốn tiện có thể bỏ vào một file script:

Windows — `run.ps1`:

```powershell
$env:PYTHONIOENCODING="utf-8"
chcp 65001
python chatbot_cli.py
```

Chạy bằng: `.\run.ps1`

macOS/Linux — `run.sh`:

```bash
#!/bin/bash
python chatbot_cli.py
```

Chạy bằng: `bash run.sh`

Lúc này file `run.ps1`/`run.sh` mới là file nằm trong dự án, còn nội dung bên trong vẫn chính là các lệnh terminal đó.

Thử hỏi:

```txt

Tôi muốn tìm phòng dưới 4 triệu ở Cầu Giấy

Làm sao để đặt lịch xem phòng?

Chủ trọ cần chuẩn bị gì khi đăng tin?

Tiền cọc thường cần lưu ý gì?

Phòng này có còn trống không?

Tin phòng bị từ chối thì sửa thế nào?

```

## Dùng LLM Provider

Set API key:

```powershell

$env:OPENAI_API_KEY="sk-..."

python chatbot_cli.py

```

Nếu không set key, chatbot vẫn chạy bằng fallback local.

## Knowledge Base đề xuất

Tạo folder:

```txt

knowledge_base/

├── renter_guide.md

├── landlord_guide.md

├── room_listing_policy.md

├── booking_policy.md

├── payment_and_deposit_faq.md

├── safety_checklist.md

└── admin_review_checklist.md

```

Nội dung nên bao gồm:

- Hướng dẫn tìm phòng và lọc phòng.
- Checklist đi xem phòng.
- Quy định đăng tin cho chủ trọ.
- Quy trình đặt lịch xem phòng.
- FAQ về tiền cọc, hợp đồng, điện nước, internet, gửi xe.
- Tiêu chí admin duyệt/từ chối tin.
- Chính sách bảo mật thông tin liên hệ.

## Import vào app chính

Ví dụ tích hợp logic chatbot vào app chính:

```python

from chatbot import PhongTroCoach, PhongTroContext

coach = PhongTroCoach()

context = PhongTroContext(

user_role="TENANT",

district="Cầu Giấy",

budget_min=2500000,

budget_max=4000000,

preferred_area_min=18,

preferred_utilities=["wifi", "parking", "private_bathroom"],

current_room_id=None,

authenticated=True,

)

response = coach.ask("Tôi nên chọn phòng nào phù hợp?", context)

print(response.answer)

```

Ví dụ context khi người dùng đang xem chi tiết phòng:

```python

context = PhongTroContext(

user_role="TENANT",

current_room_id=12,

room_price=3500000,

room_area=22,

room_district="Bình Thạnh",

room_status="APPROVED",

authenticated=True,

)

response = coach.ask("Phòng này có điểm gì cần hỏi chủ trọ trước khi thuê?", context)

```

## Luồng trả lời khuyến nghị

Mỗi câu trả lời nên có cấu trúc:

1. Trả lời trực tiếp câu hỏi.
2. Nếu có dữ liệu phòng/context, dùng dữ liệu đó để cá nhân hóa.
3. Nếu cần hành động, đưa checklist ngắn.
4. Nếu thiếu dữ liệu, nói rõ cần thêm thông tin gì.
5. Nếu liên quan đặt lịch/thanh toán/duyệt tin, nhắc rằng hệ thống phải xác nhận qua API chính thức.

Ví dụ:

```txt

Với ngân sách 3-4 triệu ở Cầu Giấy, bạn nên ưu tiên phòng 18-25m², có nhà vệ sinh riêng và chỗ gửi xe.

Bạn nên kiểm tra thêm 4 điểm:

1. Điện nước tính theo giá nào.
2. Tiền cọc bao nhiêu tháng.
3. Có giới hạn giờ giấc không.
4. Phòng có hợp đồng rõ ràng không.

Nếu muốn, tôi có thể lọc danh sách phòng phù hợp theo ngân sách và khu vực của bạn.

```

## API tích hợp sau MVP

Chatbot có thể gọi các API sau khi nâng cấp:

- `GET /api/rooms` để tìm phòng theo query.
- `GET /api/rooms/{id}` để lấy chi tiết phòng đang xem.
- `POST /api/bookings` để tạo lịch xem phòng sau khi user xác nhận.
- `GET /api/bookings/room/{roomId}` để kiểm tra lịch đã đặt.
- `POST /api/chat/conversations` để mở cuộc trò chuyện với chủ trọ.
- `GET /api/users/me` để lấy role và thông tin người dùng hiện tại.

## Lộ trình triển khai (Roadmap)

- **Giai đoạn 1 — MVP**: website đăng/tìm phòng cơ bản, chatbot fallback + RAG keyword, đặt lịch xem phòng.
- **Giai đoạn 2 — RAG nâng cao**: thay keyword bằng embeddings, lưu conversation memory, tích hợp LLM ổn định.
- **Giai đoạn 3 — Realtime & Tool calling**: chat realtime (WebSocket), chatbot gọi API phòng/booking trực tiếp.
- **Giai đoạn 4 — Production & Đo lường**: CI/CD, deploy cloud, dashboard chất lượng câu trả lời, kiểm thử guardrail tự động.

## Nâng cấp sau MVP

- Thay keyword RAG bằng embeddings.
- Lưu conversation memory theo user/session.
- Kết nối event store thật: tìm kiếm, xem phòng, đặt lịch, chat.
- Thêm tool calling để gọi API phòng, booking, chat.
- Thêm tone examples riêng cho người thuê/chủ trọ/admin.
- Thêm feedback accepted/rejected để cải thiện câu trả lời.
- Thêm dashboard đo chất lượng câu trả lời: helpful rate, escalation rate, fallback rate.
- Thêm kiểm thử guardrail tự động cho các câu hỏi nhạy cảm.

---

## Cách tổ chức code

Dự án nên tách thành **3 service độc lập** thay vì gộp chung, vì backend nghiệp vụ dùng **Java/Spring Boot** còn RAG/AI dùng **Python** (hệ sinh thái embeddings, LLM, vector tốt nhất đều ở Python). Cách tổ chức gợi ý là một **monorepo** (1 repo chứa nhiều thư mục con) để dễ quản lý version và CI/CD chung.

```
phong-tro-platform/
├── frontend/                  # Next.js (React + TypeScript)
├── backend/                   # Spring Boot (Java) - nghiệp vụ chính
├── rag-service/               # FastAPI (Python) - chatbot + RAG
├── knowledge_base/            # Tài liệu tri thức cho RAG (markdown)
├── docker-compose.yml         # Chạy tất cả service ở local
├── .github/workflows/         # CI/CD (GitHub Actions)
└── README.md
```

### 1. Vì sao tách `rag-service` riêng và dùng FastAPI?

- **Spring Boot là Java**, không phù hợp để chạy embeddings/LLM. Các thư viện mạnh nhất (OpenAI SDK, LangChain/LlamaIndex, sentence-transformers, pgvector client) đều là **Python**.
- **FastAPI** là framework Python nhẹ, nhanh, hỗ trợ async tốt — rất hợp để bọc logic RAG thành một **REST API riêng** mà Spring Boot có thể gọi sang.
- Tách riêng giúp **scale độc lập**: khi nhiều người chat cùng lúc, chỉ cần tăng tài nguyên cho `rag-service` mà không đụng tới backend nghiệp vụ.
- Trả lời câu hỏi của bạn: **đúng, nên dùng FastAPI để kết nối phần code AI/RAG**. Luồng là: `Frontend → Spring Boot → (gọi HTTP) → FastAPI RAG Service → Vector DB + LLM`. Spring Boot vẫn là cổng chính lo xác thực JWT, phân quyền, dữ liệu phòng; FastAPI chỉ chuyên trả lời câu hỏi.

```
[Frontend] → [Spring Boot /api/chat] → [FastAPI /rag/answer] → [pgvector] + [OpenAI LLM]
```

### 2. Folder `knowledge_base/` — kho tri thức cho RAG

Đây là nơi lưu **tài liệu nội bộ dạng văn bản** (markdown) để chatbot truy xuất trước khi trả lời. Đây chính là "nguồn sự thật" giúp AI không bịa thông tin.

**Folder này làm gì:**

- Chứa toàn bộ kiến thức nghiệp vụ: hướng dẫn thuê, quy định đăng tin, FAQ cọc/hợp đồng, checklist an toàn...
- Được hệ thống **đọc → chia nhỏ (chunking) → tạo embedding → lưu vào vector DB (pgvector)**.
- Khi người dùng hỏi, hệ thống tìm các đoạn tài liệu liên quan nhất ở đây rồi ghép vào prompt gửi LLM.
- Dễ cập nhật: chỉ cần sửa file `.md`, chạy lại script ingest là kiến thức của chatbot được làm mới.

**Cấu trúc gợi ý:**

```
knowledge_base/
├── renter_guide.md            # Hướng dẫn tìm & lọc phòng cho người thuê
├── landlord_guide.md          # Hướng dẫn đăng tin cho chủ trọ
├── room_listing_policy.md     # Quy định nội dung tin đăng
├── booking_policy.md          # Quy trình đặt lịch xem phòng
├── payment_and_deposit_faq.md # FAQ cọc, hợp đồng, điện nước, internet, gửi xe
├── safety_checklist.md        # Checklist đi xem phòng an toàn
├── admin_review_checklist.md  # Tiêu chí admin duyệt/từ chối tin
└── voucher_policy.md          # Chính sách hoàn tiền / voucher sau khi thuê
```

<aside>
💡

Mỗi file nên ngắn gọn, một chủ đề, dùng heading rõ ràng để khi chunking các đoạn không bị lẫn nội dung. Đây là yếu tố quan trọng nhất quyết định chất lượng câu trả lời RAG.

</aside>

**Lưu ý: đây là file dữ liệu, KHÔNG phải code.** Các file `.md` này nằm trong dự án nhưng chỉ chứa chữ (như bài hướng dẫn), không chứa lệnh lập trình. Code không chứa nội dung tri thức — code chỉ **đọc** các file này, biến thành vector và lưu vào pgvector. Khi muốn chatbot biết thêm điều gì, bạn chỉ sửa file `.md` rồi chạy lại `ingest.py`, **không cần sửa code**. Nhờ vậy người không biết lập trình vẫn cập nhật được kiến thức cho bot.

Ví dụ nội dung bên trong `booking_policy.md`:

```
# Quy trình đặt lịch xem phòng

## Bước đặt lịch
1. Người thuê chọn phòng và bấm "Đặt lịch xem".
2. Chọn ngày giờ mong muốn.
3. Hệ thống gửi yêu cầu cho chủ trọ xác nhận.

## Lưu ý
- Mỗi người được đặt tối đa 3 lịch chờ xác nhận.
- Có thể hủy lịch trước giờ hẹn 2 tiếng.
```

Còn `ingest.py` (code) chỉ làm việc đọc folder:

```python
from pathlib import Path

def load_documents():
    docs = []
    for file in Path("knowledge_base").glob("*.md"):
        docs.append(file.read_text(encoding="utf-8"))
    return docs
```

### 3. Cách tổ chức code trong `rag-service/` (FastAPI)

```
rag-service/
├── app/
│   ├── main.py                # Khởi tạo FastAPI app, khai báo router
│   ├── api/
│   │   └── routes_chat.py     # Endpoint: POST /rag/answer
│   ├── core/
│   │   ├── config.py          # Đọc biến môi trường (OPENAI_API_KEY, DB_URL...)
│   │   └── guardrails.py      # Luật chặn câu trả lời nhạy cảm/bịa đặt
│   ├── rag/
│   │   ├── ingest.py          # Đọc knowledge_base → chunk → embedding → lưu DB
│   │   ├── retriever.py       # Tìm tài liệu liên quan từ pgvector
│   │   ├── embeddings.py      # Tạo vector từ văn bản
│   │   └── prompt_builder.py  # Ghép context + tài liệu thành prompt
│   ├── llm/
│   │   ├── openai_client.py   # Gọi OpenAI API
│   │   └── fallback.py        # Trả lời rule/keyword khi chưa có API key
│   └── models/
│       └── schemas.py         # Pydantic models cho request/response
├── tests/                     # pytest cho retriever, guardrail, API
├── requirements.txt           # fastapi, uvicorn, openai, pgvector, pydantic...
└── Dockerfile
```

**Luồng code khi có request:**

1. `routes_chat.py` nhận câu hỏi + context (vai trò, ngân sách, phòng đang xem).
2. `retriever.py` tạo embedding cho câu hỏi và truy vấn `pgvector` lấy tài liệu liên quan.
3. `prompt_builder.py` ghép tài liệu + context thành prompt.
4. `openai_client.py` gọi LLM sinh câu trả lời (hoặc `fallback.py` nếu chưa có API key).
5. `guardrails.py` kiểm tra trước khi trả kết quả về cho Spring Boot.

### 4. Cách tổ chức `backend/` (Spring Boot)

Theo mô hình phân lớp chuẩn của Spring Boot, tách theo module nghiệp vụ:

```
backend/src/main/java/com/phongtro/
├── config/                    # SecurityConfig, JWT, CORS, RestTemplate/WebClient
├── auth/                      # Đăng nhập, đăng ký, phân quyền RBAC
├── room/                      # Controller / Service / Repository / Entity phòng
├── booking/                   # Đặt lịch xem phòng
├── chat/                      # Hội thoại người thuê - chủ trọ
│   └── RagClient.java         # Gọi sang FastAPI rag-service qua HTTP
├── user/                      # Quản lý người dùng
└── common/                    # DTO, exception, validation dùng chung
```

- Mỗi module nên đủ 4 lớp: **Controller** (nhận request) → **Service** (nghiệp vụ) → **Repository** (truy vấn DB) → **Entity** (ánh xạ bảng).
- `RagClient.java` là nơi Spring Boot **gọi sang FastAPI**, đóng vai trò "cầu nối" giữa nghiệp vụ Java và AI Python.

### 5. Cách tổ chức `frontend/` (Next.js)

```
frontend/src/
├── app/                       # Routing (App Router): /rooms, /login, /chat...
├── components/                # Component tái sử dụng (RoomCard, ChatBox...)
├── features/                  # Gom logic theo tính năng (rooms, booking, chat)
├── lib/                       # api client (axios), auth helper, utils
├── hooks/                     # Custom hooks (useRooms, useChat...)
└── types/                     # TypeScript types/interfaces
```

### 6. Nguyên tắc tổ chức chung

| **Nguyên tắc** | **Ý nghĩa** |
| --- | --- |
| **Tách theo tính năng (feature-based)** | Gom code cùng nghiệp vụ vào một thư mục thay vì rải rác theo loại file |
| **Mỗi service một trách nhiệm** | Backend lo nghiệp vụ, rag-service lo AI, frontend lo giao diện |
| **Tách config khỏi code** | API key, DB URL để trong biến môi trường (.env), không hardcode |
| **Giao tiếp qua REST API** | Các service nói chuyện qua HTTP/JSON, dễ thay thế và scale riêng |
| **knowledge_base tách riêng code** | Người không biết lập trình vẫn cập nhật được tri thức cho chatbot |