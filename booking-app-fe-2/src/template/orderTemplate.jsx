import React from 'react'

const orderTemplate = (props) => {
  const { listCart, totalAmount, info } = props
  console.log(listCart)
  return (
    <div>
      <title />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            '\n\nbody, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }\ntable, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }\nimg { -ms-interpolation-mode: bicubic; }\n\nimg { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }\ntable { border-collapse: collapse !important; }\nbody { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }\n\n\na[x-apple-data-detectors] {\n    color: inherit !important;\n    text-decoration: none !important;\n    font-size: inherit !important;\n    font-family: inherit !important;\n    font-weight: inherit !important;\n    line-height: inherit !important;\n}\n\n@media screen and (max-width: 480px) {\n    .mobile-hide {\n        display: none !important;\n    }\n    .mobile-center {\n        text-align: center !important;\n    }\n}\ndiv[style*="margin: 16px 0;"] { margin: 0 !important; }\n',
        }}
      />
      <div
        style={{
          display: 'none',
          fontSize: '1px',
          color: '#fefefe',
          lineHeight: '1px',
          fontFamily: 'Open Sans, Helvetica, Arial, sans-serif',
          maxHeight: '0px',
          maxWidth: '0px',
          opacity: 0,
          overflow: 'hidden',
        }}
      ></div>
      <table border={0} cellPadding={0} cellSpacing={0} width="100%">
        <tbody>
          <tr>
            <td
              align="center"
              style={{ backgroundColor: '#eeeeee' }}
              bgcolor="#eeeeee"
            >
              <table
                align="center"
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{ maxWidth: '600px' }}
              >
                <tbody>
                  <tr>
                    <td
                      align="center"
                      style={{
                        padding: '35px 35px 20px 35px',
                        backgroundColor: '#ffffff',
                      }}
                      bgcolor="#ffffff"
                    >
                      <table
                        align="center"
                        border={0}
                        cellPadding={0}
                        cellSpacing={0}
                        width="100%"
                        style={{ maxWidth: '600px' }}
                      >
                        <tbody>
                          <tr>
                            <td
                              align="center"
                              style={{
                                fontFamily:
                                  'Open Sans, Helvetica, Arial, sans-serif',
                                fontSize: '16px',
                                fontWeight: 400,
                                lineHeight: '24px',
                                paddingTop: '25px',
                              }}
                            >
                              <img
                                src=" https://vinpearlphuquocresort.com/wp-content/uploads/2021/09/icon-thanh-cong-300x300.png"
                                width={125}
                                height={120}
                                style={{ display: 'block', border: '0px' }}
                              />
                              <br />
                              <h2
                                style={{
                                  fontSize: '30px',
                                  fontWeight: 800,
                                  lineHeight: '36px',
                                  color: '#333333',
                                  margin: 0,
                                }}
                              >
                                Bạn đã đặt hàng thành công!
                              </h2>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="left"
                              style={{
                                fontFamily:
                                  'Open Sans, Helvetica, Arial, sans-serif',
                                fontSize: '16px',
                                fontWeight: 400,
                                lineHeight: '24px',
                                paddingTop: '10px',
                              }}
                            >
                              <p
                                style={{
                                  fontSize: '16px',
                                  fontWeight: 400,
                                  lineHeight: '24px',
                                  color: '#777777',
                                }}
                              >
                                Cảm ơn quý khách đã tin tưởng nhà hàng của chúng
                                tôi! Đơn hàng sẽ được giao sớm nhất
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style={{ paddingTop: '20px' }}>
                              <table
                                cellSpacing={0}
                                cellPadding={0}
                                border={0}
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="75%"
                                      align="left"
                                      bgcolor="#eeeeee"
                                      style={{
                                        fontFamily:
                                          'Open Sans, Helvetica, Arial, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: 800,
                                        lineHeight: '24px',
                                        padding: '10px',
                                      }}
                                    >
                                      Thông tin đơn hàng
                                    </td>
                                  </tr>
                                  {listCart.map((item) => (
                                    <tr>
                                      <td
                                        width="75%"
                                        align="left"
                                        style={{
                                          fontFamily:
                                            'Open Sans, Helvetica, Arial, sans-serif',
                                          fontSize: '16px',
                                          fontWeight: 400,
                                          lineHeight: '24px',
                                          padding: '15px 10px 5px 10px',
                                        }}
                                      >
                                        {item.title} ({item.number})
                                      </td>
                                      <td
                                        width="25%"
                                        align="left"
                                        style={{
                                          fontFamily:
                                            'Open Sans, Helvetica, Arial, sans-serif',
                                          fontSize: '16px',
                                          fontWeight: 400,
                                          lineHeight: '24px',
                                          padding: '15px 10px 5px 10px',
                                        }}
                                      >
                                        {item.price * item.number}đ
                                      </td>
                                    </tr>
                                  ))}
                                  {/* <tr>
                                    <td
                                      width="75%"
                                      align="left"
                                      style={{
                                        fontFamily:
                                          'Open Sans, Helvetica, Arial, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        lineHeight: '24px',
                                        padding: '15px 10px 5px 10px',
                                      }}
                                    >
                                      Mặt hàng đã mua (1)
                                    </td>
                                    <td
                                      width="25%"
                                      align="left"
                                      style={{
                                        fontFamily:
                                          'Open Sans, Helvetica, Arial, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        lineHeight: '24px',
                                        padding: '15px 10px 5px 10px',
                                      }}
                                    >
                                      1000000đ
                                    </td>
                                  </tr> */}
                                  <tr>
                                    <td
                                      width="75%"
                                      align="left"
                                      style={{
                                        fontFamily:
                                          'Open Sans, Helvetica, Arial, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        lineHeight: '24px',
                                        padding: '5px 10px',
                                      }}
                                    >
                                      Phí vận chuyển
                                    </td>
                                    <td
                                      width="25%"
                                      align="left"
                                      style={{
                                        fontFamily:
                                          'Open Sans, Helvetica, Arial, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        lineHeight: '24px',
                                        padding: '5px 10px',
                                      }}
                                    >
                                      30000đ
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style={{ paddingTop: '20px' }}>
                              <table
                                cellSpacing={0}
                                cellPadding={0}
                                border={0}
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="75%"
                                      align="left"
                                      style={{
                                        fontFamily:
                                          'Open Sans, Helvetica, Arial, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: 800,
                                        lineHeight: '24px',
                                        padding: '10px',
                                        borderTop: '3px solid #eeeeee',
                                        borderBottom: '3px solid #eeeeee',
                                      }}
                                    >
                                      Tổng tiền
                                    </td>
                                    <td
                                      width="25%"
                                      align="left"
                                      style={{
                                        fontFamily:
                                          'Open Sans, Helvetica, Arial, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: 800,
                                        lineHeight: '24px',
                                        padding: '10px',
                                        borderTop: '3px solid #eeeeee',
                                        borderBottom: '3px solid #eeeeee',
                                      }}
                                    >
                                      {totalAmount}đ
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td
                      align="left"
                      height="100%"
                      valign="top"
                      width="100%"
                      style={{
                        padding: '0 35px 35px 35px',
                        backgroundColor: '#ffffff',
                      }}
                      bgcolor="#ffffff"
                    >
                      <table
                        align="left"
                        border={0}
                        cellPadding={0}
                        cellSpacing={0}
                        width="100%"
                        style={{ maxWidth: '660px' }}
                      >
                        <tbody>
                          <tr>
                            <td
                              align="left"
                              valign="top"
                              style={{ fontSize: 0 }}
                            >
                              <div
                                style={{
                                  display: 'inline-block',
                                  maxWidth: '50%',
                                  minWidth: '240px',
                                  verticalAlign: 'top',
                                  width: '100%',
                                }}
                              >
                                <table
                                  align="left"
                                  border={0}
                                  cellPadding={0}
                                  cellSpacing={0}
                                  width="100%"
                                  style={{ maxWidth: '300px' }}
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        align="left"
                                        valign="top"
                                        style={{
                                          fontFamily:
                                            'Open Sans, Helvetica, Arial, sans-serif',
                                          fontSize: '16px',
                                          fontWeight: 400,
                                          lineHeight: '24px',
                                        }}
                                      >
                                        <p style={{ fontWeight: 800 }}>
                                          Địa chỉ giao hàng
                                        </p>
                                        <p>{info.address}</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default orderTemplate
