-- Insert Profile
INSERT INTO Profile (id, name, position, image, backImage, about) VALUES
                                                                      (1, 'Jeff Bezon', 'Intern @Amazon', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg', NULL, NULL),
                                                                      (2, 'Vadim Savin', 'Founder at notJust.dev', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/2.jpg', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley'),
                                                                      (3, 'Peter Johnson', 'CTO at Facebook', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg', NULL, NULL),
                                                                      (4, 'StepZen, an IBM Company', 'GraphQL server with unique architecture', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/stepzen.jpeg', NULL, NULL);

-- Insert Post
INSERT INTO Post (id, content, image, userId) VALUES
                                                  (2, 'What does notJust Developer mean to you?', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/0.jpeg', 2),
                                                  (4, 'Become a GraphQL Ninja with StepZen 🚀', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/stepzen-stickers.png', 4),
                                                  (1, 'Exciting news! Just landed an internship at Amazon. I figured it''s about time I try out this whole e-commerce thing. 😄 #NewBeginnings #FromCEOtoIntern', NULL, 1),
                                                  (3, 'Join me for a talk on scaling technology in startups', NULL, 3);

-- Insert Reaction (likes)
INSERT INTO Reaction (postId, userId, type) VALUES
                                                (2, 2, 'like'),
                                                (4, 4, 'like'),
                                                (1, 1, 'like'),
                                                (3, 3, 'like');

-- Insert Comment
INSERT INTO Comment (postId, userId, comment) VALUES
                                                  (2, 4, 'notJust Developers are changing the world one line of code at a time'),
                                                  (2, 1, 'nice hoodie!');

-- Insert Experience
INSERT INTO Experience (id, title, companyName, companyImage, userId) VALUES
                                                                          (1, 'Founder', 'notJust.dev', 'https://media.licdn.com/dms/image/C4E0BAQGmtxs_h3L1fg/company-logo_100_100/0/1646644437762?e=1697673600&v=beta&t=krLyDvQnoEVEBn1MlGrFEM8cpt5Y24XvXJV7RjXyGsc', 2),
                                                                          (2, 'Co-Founder & CTO', 'Fitenium', 'https://media.licdn.com/dms/image/C4D0BAQHg4ra02yFrcw/company-logo_200_200/0/1573813337379?e=1697673600&v=beta&t=3wUnjLtfkYpIMJg4ZP2qq7Vj0rvU7aUOVrkffLabTuQ', 2);
