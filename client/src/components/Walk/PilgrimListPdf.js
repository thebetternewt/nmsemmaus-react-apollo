import React from 'react';
import PropTypes from 'prop-types';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PilgrimListPdf = props => {
  const { walkNumber, pilgrims } = props;

  const pilgrimItems = pilgrims.map((pilgrim, index) => [
    `${index + 1}`,
    `${pilgrim.firstName} ${pilgrim.lastName}`,
    `${pilgrim.sponsor}`,
    `${pilgrim.hometown}`,
  ]);

  const docDefinition = {
    content: [
      {
        text: `Walk #${walkNumber}`,
        bold: true,
        marginBottom: 20,
        fontSize: 20,
      },
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [20, '*', 'auto', 'auto'],

          body: [['', 'Name', 'Sponsor', 'Hometown'], ...pilgrimItems],
        },
      },
    ],
  };
  return (
    <div>
      <Button
        variant="raised"
        color="primary"
        style={{ marginTop: '2rem' }}
        onClick={() => pdfMake.createPdf(docDefinition).open()}
      >
        Download <CloudDownloadIcon style={{ marginLeft: '10px' }} />
      </Button>
    </div>
  );
};

PilgrimListPdf.propTypes = {
  walkNumber: PropTypes.string.isRequired,
  pilgrims: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default PilgrimListPdf;
